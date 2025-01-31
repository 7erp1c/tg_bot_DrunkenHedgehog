import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackEntity } from '../entity/feedback.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(FeedbackEntity) private readonly feedbackRepository: Repository<FeedbackEntity>,
        @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
    ) {}

    async getUserFeedback(userId: number): Promise<FeedbackEntity | null> {
        return this.feedbackRepository.findOne({ where: { user: { id: userId } } });
    }

    async createOrUpdateFeedback(userId: number, data: string, comment?: string): Promise<FeedbackEntity> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        let feedback = await this.getUserFeedback(userId);

        if (feedback) {
            feedback.data = data;
            feedback.comment = comment ?? feedback.comment;
            feedback.updateDate = new Date();
        } else {
            feedback = this.feedbackRepository.create({ user, data, comment }); // Вместо userId используем user
        }

        return this.feedbackRepository.save(feedback);
    }
}
