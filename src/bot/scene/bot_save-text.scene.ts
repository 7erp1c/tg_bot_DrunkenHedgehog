import { Ctx, On, Scene } from 'nestjs-telegraf';
import { BotScene } from '../common/enum/bot_scene.enum';
import { actionButtonsAdminUpdateResume } from '../button/bot_admin-markup.buttons';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ResumeService } from '../../resume/service/resume.service';

@Scene(BotScene.SaveTextScene)
export class UpdateTextScene {
    constructor(private readonly resumeService: ResumeService) {}
    @On('text')
    async saveText(@Ctx() ctx: any) {
        if ('text' in ctx.message) {
            const textInput = ctx.message.text;
            // Проверяем, находится ли пользователь на этапе подтверждения
            if (ctx.session.awaitingConfirmation) {
                // Обрабатываем ответ пользователя
                if (textInput.toLowerCase() === 'y') {
                    //Если пользователь подтвердил (y)
                    const save = await this.resumeService.saveDataToDatabase(
                        ctx.session.editingField,
                        ctx.session.tempInput,
                    ); // Сохранение в базу
                    if (!save) {
                        throw new HttpException(
                            'An error occurred while saving data',
                            HttpStatus.INTERNAL_SERVER_ERROR,
                        );
                    }
                    await ctx.reply('Данные успешно сохранены!');
                    await ctx.reply('Выберите поле, которое хотите редактировать:', actionButtonsAdminUpdateResume);
                } else if (textInput.toLowerCase() === 'n') {
                    // Если пользователь отказался (n)
                    await ctx.reply('Изменение данных отменено.');
                    await ctx.reply(`Данные которые вы ввели: ${textInput}`);
                    ctx.session.awaitingConfirmation = false;
                    ctx.session.tempInput = false;
                    ctx.scene.leave();
                    await ctx.reply('Выберите поле, которое хотите редактировать:', actionButtonsAdminUpdateResume);
                } else {
                    // Если пользователь ввел некорректный ответ
                    await ctx.reply('Пожалуйста, ответьте "y" или "n".');
                    return;
                }

                // Сбрасываем флаги после обработки
                ctx.session.awaitingConfirmation = false;
                ctx.session.tempInput = false;

                return;
            }

            // Проверяем, редактирует ли пользователь какое-либо поле
            if (ctx.session.editingField) {
                const field = ctx.session.editingField;

                // Сохраняем временно введенный текст в сессию
                ctx.session.tempInput = textInput;

                // Запрашиваем подтверждение
                await ctx.reply(
                    `Вы хотите сохранить следующие данные для поля "${field}": "${textInput}"?\nОтветьте "y" для подтверждения или "n" для отмены.`,
                );

                // Устанавливаем флаг ожидания подтверждения
                ctx.session.awaitingConfirmation = true;
            } else {
                await ctx.reply('Нажмите на кнопку, чтобы выбрать поле для редактирования.');
            }
        } else {
            await ctx.reply('Ожидается текстовое сообщение.');
        }
    }
}
