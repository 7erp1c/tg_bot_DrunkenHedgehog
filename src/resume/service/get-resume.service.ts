import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResumeEntity } from '../entity/resume.entity';
import { Repository } from 'typeorm';
import { EnField } from '../../bot/common/enum/bot_db-field.enum';
import { resumeIdConstant } from '../../constants/messages';

@Injectable()
export class GetResumeService {
    constructor(@InjectRepository(ResumeEntity) private readonly resumeRepository: Repository<ResumeEntity>) {}

    async getResumeInfo(field: EnField) {
        const id = +resumeIdConstant!;
        const result = await this.resumeRepository.findOneBy({ id });

        if (!result) {
            return null; // Если не нашли, возвращаем null
        }

        if (field === 'photos') {
            // Перебираем массив photos и ищем объект с key: 'main'
            const mainPhoto = result.photos.find((p) => p.key === 'main');

            if (mainPhoto) {
                // Если нашли фото с ключом 'main', возвращаем его ссылку (data)
                return mainPhoto.data;
            }
        }

        return result ? result[field] : null;
    }
}
