import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackEntity } from './entity/feedback.entity';
import { FeedbackService } from './service/feedback.service';
import { UserEntity } from '../user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackEntity, UserEntity])],
    providers: [FeedbackService],
    exports: [FeedbackService],
})
export class FeedBackModule {}
