import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ConfigurationModule } from '../common/configuration.module';
import { UserModule } from '../user/user.module';
import { BotUsers } from './main/bot_main_users.admin.';
import { ResumeActions } from './action/bot_update-menu.resume';
import { BotUpdateProfile } from './action/bot_update-profile.resume';
import { UpdateTextScene } from './scene/bot_save-text.scene';
import { ResumeModule } from '../resume/resume.module';
import { SavePhotoScene } from './scene/bot_save-photos.scene';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { GetResumeActions } from './action/bot_get-menu.resume';
import { BotGetProfile } from './action/bot_get-profile.resume';
import { FeedBeckModule } from '../feedbeck/feedbeck.module';

const bot_class = [
    BotUsers,
    ResumeActions,
    BotUpdateProfile,
    UpdateTextScene,
    SavePhotoScene,
    GetResumeActions,
    BotGetProfile,
];

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), ConfigurationModule, UserModule, ResumeModule, FeedBeckModule],
    providers: [...bot_class],
    exports: [...bot_class],
})
export class BotModule {}
