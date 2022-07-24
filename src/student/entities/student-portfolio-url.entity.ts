import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class StudentPortfolioUrl {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 255,
  })
  projectUrl: string;

  @ManyToOne((type) => Student, (entity) => entity.portfolioUrls, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  student: Student;
}
