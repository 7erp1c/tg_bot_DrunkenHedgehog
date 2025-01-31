import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackEntity } from '../entity/feedbeck.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedBeckService {
    constructor(
        @InjectRepository(FeedbackEntity)
        private readonly feedbackRepository: Repository<FeedbackEntity>,
    ) {}

    async getUserFeedback(userId: number): Promise<FeedbackEntity | null> {
        return this.feedbackRepository.findOne({ where: { userId } });
    }

    async createOrUpdateFeedback(userId: number, data: string, comment?: string): Promise<FeedbackEntity> {
        let feedback = await this.getUserFeedback(userId);

        if (feedback) {
            feedback.data = data;
            feedback.comment = comment ?? feedback.comment;
            feedback.updateDate = new Date();
        } else {
            feedback = this.feedbackRepository.create({ userId, data, comment });
        }

        return this.feedbackRepository.save(feedback);
    }
}
