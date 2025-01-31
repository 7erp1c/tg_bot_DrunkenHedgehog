import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'feedback' })
export class FeedbackEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ type: 'text' })
    data: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updateDate: Date;

    @Column({ type: 'text', nullable: true })
    comment: string;
}
