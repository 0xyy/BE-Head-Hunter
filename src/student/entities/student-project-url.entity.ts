import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { StudentInfo } from './student-info.entity';
import { StudentInfoInterface, StudentProjectUrlInterface } from '../../types';

@Entity()
export class StudentProjectUrl
    extends BaseEntity
    implements StudentProjectUrlInterface {
    @PrimaryGeneratedColumn('uuid')
        id: string;
    @Column({
        length: 255
    })
        projectUrl: string;

    @ManyToOne((type) => StudentInfo, (entity) => entity.projectUrls)
    @JoinColumn()
        studentInfo: StudentInfoInterface;
}
