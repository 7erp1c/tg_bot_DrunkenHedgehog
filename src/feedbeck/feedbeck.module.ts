import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackEntity } from './entity/feedbeck.entity';
import { FeedBeckService } from './service/feedbeck.service';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackEntity])],
    providers: [FeedBeckService],
    exports: [FeedBeckService],
})
export class FeedBeckModule {}
