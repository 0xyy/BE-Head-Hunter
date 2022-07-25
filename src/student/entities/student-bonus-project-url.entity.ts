import {
  StudentBonusProjectUrlInterface,
  StudentCoursesDegreeInterface,
} from 'src/types';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentCoursesDegree } from './student-courses-degree.entity';

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

  @ManyToOne(
    (type) => StudentCoursesDegree,
    (entity) => entity.bonusProjectUrls,
    {
      onDelete: 'CASCADE',
    },
  )
  studentCoursesDegree: StudentCoursesDegreeInterface;
}
