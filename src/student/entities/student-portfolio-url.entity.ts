import { StudentInterface, StudentPortfolioUrlInterface } from 'src/types';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class StudentPortfolioUrl
  extends BaseEntity
  implements StudentPortfolioUrlInterface
{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 255,
  })
  projectUrl: string;

  @ManyToOne((type) => Student, (entity) => entity.portfolioUrls)
  @JoinColumn()
  student: StudentInterface;
}
