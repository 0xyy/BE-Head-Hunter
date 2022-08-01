import {
    StudentInfoInterface,
    StudentPortfolioUrlInterface
} from '../../types';
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { StudentInfo } from './student-info.entity';

@Entity()
export class StudentPortfolioUrl
    extends BaseEntity
    implements StudentPortfolioUrlInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({
        length: 255
    })
    projectUrl: string;

    @ManyToOne((type) => StudentInfo, (entity) => entity.portfolioUrls, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    studentInfo: StudentInfoInterface;
}
