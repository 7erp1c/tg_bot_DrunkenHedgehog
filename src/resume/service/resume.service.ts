import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ResumeEntity } from '../entity/resume.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResumeService {
    constructor(@InjectRepository(ResumeEntity) private readonly resumeRepository: Repository<ResumeEntity>) {}

    async saveDataToDatabase(field: string, body: string) {
        // Проверяем, что поле разрешено для обновления
        const allowedFields = ['contactInfo', 'projects', 'aboutMe', 'technologies', 'experience', 'education'];
        if (!allowedFields.includes(field)) {
            throw new BadRequestException(`Field "${field}" is not allowed for update.`);
        }

        // Получаем запись по ID
        const resume = await this.resumeRepository.findOne({ where: { id: 1 } });
        if (!resume) {
            throw new NotFoundException(`Resume with ID ${1} not found.`);
        }

        // Проверяем тип поля (массив или строка) и обновляем значение
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
}
