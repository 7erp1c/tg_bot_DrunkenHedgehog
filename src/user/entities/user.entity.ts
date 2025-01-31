import { Column, Entity, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';

import { IUser } from '../../common/types';
import { FeedbackEntity } from '../../feedbeck/entity/feedback.entity';

@Entity({ name: 'users' })
export class UserEntity implements IUser {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'text', default: 'unknown' })
    first_name: string;

    @Column({ type: 'text', default: 'unknown' })
    last_name: string;

    @Column({ type: 'text', default: 'unknown' })
    username: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToOne(() => FeedbackEntity, (feedback) => feedback.user, { cascade: true })
    @JoinColumn()
    feedback: FeedbackEntity;
}
