import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'resume' })
export class ResumeEntity {
    @PrimaryColumn()
    id: number;

    @Column('jsonb', { nullable: true, default: [] })
    photos: { key: string; data: string }[];

    @Column()
    contactInfo: string;

    @Column('text', { array: true })
    projects: string[];

    @Column()
    aboutMe: string;

    @Column('text', { array: true })
    technologies: string[];

    @Column()
    experience: string;

    @Column()
    education: string;
}
