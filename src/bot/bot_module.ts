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
import { GetResumeActions } from './action/bot_get-menu.resume';
import { BotGetProfile } from './action/bot_get-profile.resume';
import { FeedBackModule } from '../feedbeck/feedBackModule';
import { FeedbackService } from '../feedbeck/service/feedback.service';
import { FeedbackEntity } from '../feedbeck/entity/feedback.entity';
import { FeedbackScene } from './scene/bot_feedback.scene';
import { FeedbackAction } from './action/feedback/bot_feedback.action';

const bot_class = [
    BotUsers,
    ResumeActions,
    FeedbackAction,
    GetResumeActions,
    BotUpdateProfile,
    UpdateTextScene,
    SavePhotoScene,
    FeedbackScene,
    BotGetProfile,
    FeedbackService,
];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, FeedbackEntity]),
        ConfigurationModule,
        UserModule,
        ResumeModule,
        FeedBackModule,
    ],
    providers: [...bot_class],
    exports: [...bot_class],
})
export class BotModule {}
