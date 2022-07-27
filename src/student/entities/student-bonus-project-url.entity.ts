import {
  StudentBonusProjectUrlInterface,
  StudentInfoInterface,
} from '../../types';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentInfo } from './student-info.entity';

@Entity()
export class StudentBonusProjectUrl
  extends BaseEntity
  implements StudentBonusProjectUrlInterface
{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 255,
  })
  projectUrl: string;

  @ManyToOne((type) => StudentInfo, (entity) => entity.bonusProjectUrls, {
    onDelete: 'CASCADE',
  })
  studentInfo: StudentInfoInterface;
}
