import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { InsertStudent } from './insert-student.entity';

@Entity()
export class StudentBonusProjectUrl {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 255,
  })
  projectUrl: string;

  @ManyToOne((type) => InsertStudent, (entity) => entity.bonusProjectUrls, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  student: Student;
}
