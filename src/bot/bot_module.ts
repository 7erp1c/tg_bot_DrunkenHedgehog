import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ConfigurationModule } from '../common/configuration.module';
import { UserModule } from '../user/user.module';
import { BotUsers } from './bot_users';
import { ResumeActions } from './action/bot_update-menu.resume';
import { BotUpdateProfile } from './action/bot_update-profile.resume';
import { UpdateScene } from './scene/bot_save_scene';
import { ResumeModule } from '../resume/resume.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), ConfigurationModule, UserModule, ResumeModule],
    providers: [BotUsers, ResumeActions, BotUpdateProfile, UpdateScene],
    exports: [BotUsers, ResumeActions, BotUpdateProfile, UpdateScene],
})
export class BotModule {}
