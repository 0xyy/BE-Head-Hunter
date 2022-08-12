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
import {
    HrInterface,
    HrToStudentInterface,
    UserInterface,
} from '../../types';
import { HrToStudentEntity } from './hr-to.student.entity';

@Entity()
export class Hr extends BaseEntity implements HrInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @OneToMany((type) => HrToStudentEntity, (entity) => entity.hr, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    studentsToInterview: HrToStudentInterface[];

    @OneToOne((type) => User, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: UserInterface;
}
