import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  StudentCoursesDegreeInterface,
  StudentInfoInterface,
  UserInterface,
  UserRole,
} from '../types';
import { StudentInfo } from '../student/entities/student-info.entity';
import { StudentCoursesDegree } from '../student/entities/student-courses-degree.entity';

@Entity()
export class User extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
    unique: true,
  })
  email: string;

  @Column()
  pwdHash: string;

  @Column()
  salz: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @Column({
    nullable: true,
  })
  activeTokenId: string | null;

  @Column({
    default: false,
  })
  active: boolean;

  @Column()
  role: UserRole;

  @OneToOne((type) => StudentCoursesDegree, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studentCoursesDegree: StudentCoursesDegreeInterface;

  @OneToOne((type) => StudentInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studentInfo: StudentInfoInterface;

  /* relation 1-1  we will merge them when will be added their entities
  @OneToOne((type) => Hr)
  hr: Hr;
  */
}
