import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { StudentInterface, StudentProjectUrlInterface } from '../../types';

@Entity()
export class StudentProjectUrl
  extends BaseEntity
  implements StudentProjectUrlInterface
{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 255,
  })
  projectUrl: string;

  @ManyToOne((type) => Student, (entity) => entity.projectUrls)
  @JoinColumn()
  student: StudentInterface;
}
