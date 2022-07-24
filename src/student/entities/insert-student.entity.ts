import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentBonusProjectUrl } from './student-bonus-project-url.entity';

@Entity()
export class InsertStudent extends BaseEntity {
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

  @OneToMany((type) => StudentBonusProjectUrl, (entity) => entity.student)
  bonusProjectUrls: StudentBonusProjectUrl[];
}
