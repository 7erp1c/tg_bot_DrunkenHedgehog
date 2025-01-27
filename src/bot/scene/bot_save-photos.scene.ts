import { Ctx, On, Scene } from 'nestjs-telegraf';
import { BotScene } from '../common/enum/bot_scene.enum';
import { ResumeService } from '../../resume/service/resume.service';
import axios from 'axios';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import { actionButtonsAdminTwo } from '../../app.buttons';

@Scene(BotScene.SavePhotoScene)
export class SavePhotoScene {
    constructor(
        private readonly resumeService: ResumeService,
        private readonly cloudinary: CloudinaryService,
    ) {}
    @On('message')
    async updatePhoto(@Ctx() ctx: any) {
        // Проверяем, ожидается ли обновление фото
        if (!ctx.session.isAwaitingPhotoUpdate) {
            await ctx.reply('Я не ожидаю фото. Используйте кнопку для загрузки нового фото.');
            return;
        }

        const message = ctx.message;

        // Проверяем наличие фото
        const photo = message.photo?.pop(); // Берём самое большое фото
        if (!photo) {
            await ctx.reply('Вы не отправили фото. Отправьте фото с подписью, которая будет ключом.');
            return;
        }
        // Получаем ключ из подписи
        const photoKey = message.caption?.trim(); // Подпись фото — это ключ
        if (!photoKey) {
            await ctx.reply('Ключ не указан. Пожалуйста, отправьте фото с подписью.');
            return;
        }

        const resumeId = +process.env.DB_ID!;

        const keyIsUnique = await this.resumeService.getPhotoByKey(resumeId, photoKey);
        if (keyIsUnique) {
            await ctx.reply('Ключ с таким именем уже записан.🙄');
            return;
        }
        try {
            // Получаем ссылку на файл
            const fileLink = await ctx.telegram.getFileLink(photo.file_id);

            // Загружаем файл в Cloudinary
            const uploadResult = await this.cloudinary.uploadToCloudinary(fileLink.href, photoKey);

            // Сохраняем фото через ResumeService
            await this.resumeService.addPhoto(resumeId, photoKey, uploadResult.secure_url);

            // Сбрасываем флаг ожидания
            ctx.session.isAwaitingPhotoUpdate = false;

            await ctx.reply(`Фото с ключом "${photoKey}" успешно добавлено!`);

            await ctx.reply('Выберите поле, которое хотите редактировать:', actionButtonsAdminTwo);

            ctx.scene.leave();
        } catch (error) {
            console.error('Ошибка при сохранении фото:', error);
            await ctx.reply('Произошла ошибка при сохранении фото. Попробуйте позже.');
        }
    }
}
