import { Module } from '@nestjs/common';
import { ResumeService } from './service/resume.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeEntity } from './entity/resume.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ResumeEntity])],
    providers: [ResumeService],
    exports: [ResumeService],
})
export class ResumeModule {}
