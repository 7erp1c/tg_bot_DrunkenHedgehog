import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { ConfigurationModule } from '../common/configuration.module';
import { RegistrationHandler } from '../bot/handlers/registration_handlers';
import { ResumeActions } from '../bot/action/bot_update-menu.resume';
import { FeedbackEntity } from '../feedbeck/entity/feedback.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, FeedbackEntity]), ConfigurationModule],
    controllers: [UserController],
    providers: [UserService, RegistrationHandler, ResumeActions],
    exports: [UserService, RegistrationHandler, ResumeActions],
})
export class UserModule {}
