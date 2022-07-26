import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentProjectUrlInterface, UserInterface } from '../../types';
import { StudentInfo } from '../../student/entities/student-info.entity';
import { User } from '../../user/user.entity';

@Entity()
export class Hr extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  company: string;

  @Column({
    type: 'int',
    width: 3,
    nullable: false,
  })
  maxReservedStudents: number;

  @OneToMany((type) => StudentInfo, (entity) => entity.hr)
  studentsToInterview: StudentProjectUrlInterface[];

  @OneToOne((type) => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserInterface;

  // @AfterRemove()
  // zmiana statusu rezerwacji usera
}
