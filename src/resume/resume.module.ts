import { Module } from '@nestjs/common';
import { ResumeService } from './service/resume.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeEntity } from './entity/resume.entity';
import { GetResumeService } from './service/get-resume.service';

@Module({
    imports: [TypeOrmModule.forFeature([ResumeEntity])],
    providers: [ResumeService, GetResumeService],
    exports: [ResumeService, GetResumeService],
})
export class ResumeModule {}
