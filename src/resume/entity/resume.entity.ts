import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photo: string;

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