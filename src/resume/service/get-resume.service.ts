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
        console.log('res,', result?.technologies);
        return result?.technologies;
    }
}
