import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { BotUsers } from '../bot/main/bot_main_users.admin.';
import { ConfigurationModule } from '../common/configuration.module';
import { RegistrationHandler } from '../bot/handlers/registration_handlers';
import { ResumeActions } from '../bot/action/bot_update-menu.resume';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), ConfigurationModule],
    controllers: [UserController],
    providers: [UserService, RegistrationHandler, ResumeActions],
    exports: [UserService, RegistrationHandler, ResumeActions],
})
export class UserModule {}
