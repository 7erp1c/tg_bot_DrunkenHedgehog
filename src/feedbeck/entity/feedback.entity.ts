import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'feedback' })
export class FeedbackEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity, (user) => user.feedback, { onDelete: 'CASCADE' })
    user: UserEntity;

    @Column({ type: 'text' })
    data: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updateDate: Date;

    @Column({ type: 'text', nullable: true })
    comment: string;
}
