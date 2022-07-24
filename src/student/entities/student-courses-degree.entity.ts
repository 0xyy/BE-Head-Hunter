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

@Entity()
export class StudentCoursesDegree extends BaseEntity {
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
  user: User;

  @OneToMany(
    (type) => StudentBonusProjectUrl,
    (entity) => entity.studentCoursesDegree,
  )
  @JoinColumn()
  bonusProjectUrls: StudentBonusProjectUrl[];
}
