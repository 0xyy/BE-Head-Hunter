import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hr } from './hr.entity';
import { StudentInfo } from '../../student/entities/student-info.entity';
import { HrInterface } from 'src/types';

@Entity()
export class HrToStudentEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    studentId: string;

    @Column()
    hrId: string;

    @ManyToOne((type) => Hr, (entity) => entity.studentsToInterview, {
        onDelete: 'CASCADE',
    })
    hr: HrInterface;

    @ManyToOne((type) => Hr, (entity) => entity.studentsToInterview, {
        onDelete: 'CASCADE',
    })
    student: StudentInfo;

    @Column(
        {
            nullable: true,
            default: null,
        },
    )
    reservationTo: Date;
}