import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ConfigurationModule } from '../common/configuration.module';
import { UserModule } from '../user/user.module';
import { BotUsers } from './bot_users';
import { ResumeActions } from './action/bot_update-menu.resume';
import { BotProfile } from './action/bot_update-profile.resume';
import { UpdateScene } from './scene/bot_save_scene';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), ConfigurationModule, UserModule],
    providers: [BotUsers, ResumeActions, BotProfile, UpdateScene],
    exports: [BotUsers, ResumeActions, BotProfile, UpdateScene],
})
export class Bot_module {}
