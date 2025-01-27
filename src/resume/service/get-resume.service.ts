import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResumeEntity } from '../entity/resume.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetResumeService {
    constructor(@InjectRepository(ResumeEntity) private readonly resumeRepository: Repository<ResumeEntity>) {}

    async getResumeInfo(field: string) {}
}
