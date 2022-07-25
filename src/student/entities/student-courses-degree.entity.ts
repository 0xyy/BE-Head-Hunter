import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { StudentBonusProjectUrl } from './student-bonus-project-url.entity';
import {
  StudentBonusProjectUrlInterface,
  StudentCoursesDegreeInterface,
  UserInterface,
} from '../../types';

@Entity()
export class StudentCoursesDegree
  extends BaseEntity
  implements StudentCoursesDegreeInterface
{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'tinyint',
  })
  courseCompletion: number;

  @Column({
    type: 'tinyint',
  })
  courseEngagment: number;

  @Column({
    type: 'tinyint',
  })
  projectDegree: number;

  @Column({
    type: 'tinyint',
  })
  teamProjectDegree: number;

  @OneToOne((type) => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserInterface;

  @OneToMany(
    (type) => StudentBonusProjectUrl,
    (entity) => entity.studentCoursesDegree,
  )
  @JoinColumn()
  bonusProjectUrls: StudentBonusProjectUrlInterface[];
}
