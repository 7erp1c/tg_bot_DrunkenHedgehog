import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ConfigurationModule } from '../common/configuration.module';
import { UserModule } from '../user/user.module';
import { BotUsers } from './main/bot_users';
import { ResumeActions } from './action/bot_update-menu.resume';
import { BotUpdateProfile } from './action/bot_update-profile.resume';
import { UpdateTextScene } from './scene/bot_save-text.scene';
import { ResumeModule } from '../resume/resume.module';
import { SavePhotoScene } from './scene/bot_save-photos.scene';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), ConfigurationModule, UserModule, ResumeModule],
    providers: [BotUsers, ResumeActions, BotUpdateProfile, UpdateTextScene, SavePhotoScene],
    exports: [BotUsers, ResumeActions, BotUpdateProfile, UpdateTextScene, SavePhotoScene],
})
export class BotModule {}
