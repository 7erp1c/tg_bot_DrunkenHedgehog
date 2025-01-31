import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ResumeEntity } from '../entity/resume.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstantResume, defaultResumeValues } from '../constants.resume';

@Injectable()
export class ResumeService {
    constructor(@InjectRepository(ResumeEntity) private readonly resumeRepository: Repository<ResumeEntity>) {}

    async saveDataToDatabase(field: string, body: string) {
        const id = +process.env.DB_ID!;

        if (!ConstantResume.includes(field)) {
            throw new BadRequestException(`Field "${field}" is not allowed for update.`);
        }

        let resume = await this.resumeRepository.findOne({ where: { id } });
        if (!resume) {
            try {
                // Если запись не найдена, создаём её с дефолтными значениями
                resume = this.resumeRepository.create({
                    id,
                    ...defaultResumeValues,
                });

                await this.resumeRepository.save(resume);

                resume = await this.resumeRepository.findOne({ where: { id } });
                if (!resume) {
                    throw new Error('Failed to fetch resume after saving.');
                }
            } catch (error) {
                console.error('Ошибка при сохранении записи в базу данных:', error);
                throw new BadRequestException('Не удалось создать запись. Проверьте корректность данных.');
            }
        }
        if (Array.isArray(resume[field])) {
            // Если поле — массив, преобразуем `body` в массив
            resume[field] = body.split(',').map((item) => item.trim());
        } else {
            // Если поле — строка, просто обновляем
            resume[field] = body;
        }

        // Сохраняем обновленные данные
        return this.resumeRepository.save(resume);
    }

    // Сохранение нового фото
    async addPhoto(resumeId: number, key: string, url: string): Promise<void> {
        try {
            const resume = await this.resumeRepository.findOne({ where: { id: resumeId } });

            if (!resume) {
                throw new Error(`Резюме с ID ${resumeId} не найдено.`);
            }

            // Добавляем новое фото с ключом в массив
            resume.photos.push({ key, data: url });

            // Сохраняем изменения
            await this.resumeRepository.save(resume);
        } catch (error) {
            // Логируем ошибку и выбрасываем её дальше
            console.error('Ошибка при добавлении фото в ResumeService:', error);
            throw new Error(
                `Не удалось сохранить фото. Причина: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
            );
        }
    }
    // async getAllPhotos(resumeId: number): Promise<{ key: string; data: Buffer }[]> {
    //     const resume = await this.resumeRepository.findOne({ where: { id: resumeId } });
    //
    //     if (!resume) {
    //         throw new Error(`Резюме с ID ${resumeId} не найдено.`);
    //     }
    //
    //     return resume.photos;
    // }

    async getPhotoByKey(resumeId: number, key: string): Promise<string | null> {
        // Находим резюме по ID
        const resume = await this.resumeRepository.findOne({ where: { id: resumeId } });

        // Если резюме не найдено, возвращаем null
        if (!resume) {
            console.warn(`Резюме с ID "${resumeId}" не найдено.`);
            return null;
        }

        // Ищем фото с указанным ключом в массиве photos
        const photo = resume.photos?.find((p) => p.key === key);

        // Если фото не найдено, возвращаем null
        if (!photo) {
            console.warn(`Фото с ключом "${key}" не найдено.`);
            return null;
        }

        // Возвращаем URL (data), если фото найдено
        return photo.data || null;
    }
    //
    // async deletePhoto(resumeId: number, key: string): Promise<void> {
    //     const photo = await this.photoRepository.findOne({ where: { resumeId, key } });
    //
    //     if (!photo) {
    //         throw new Error(`Фото с ключом "${key}" не найдено.`);
    //     }
    //
    //     await this.photoRepository.remove(photo);
    // }
}
