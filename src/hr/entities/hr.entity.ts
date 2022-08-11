import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../../user/user.entity';
import { StudentInfo } from '../../student/entities/student-info.entity';
import { StudentProjectUrlInterface, UserInterface } from '../../types';

@Entity()
export class Hr extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    fullName: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    company: string;

    @Column({
        type: 'int',
        width: 3,
        nullable: false
    })
    maxReservedStudents: number;

    @OneToMany((type) => StudentInfo, (entity) => entity.hr)
    studentsToInterview: StudentProjectUrlInterface[];

    @OneToOne((type) => User, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    user: UserInterface;

    // @AfterRemove()
    // zmiana statusu rezerwacji usera
}
