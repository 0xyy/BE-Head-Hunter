import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentInfo } from '../student/entities/student-info.entity';
import { Hr } from '../hr/entities/hr.entity';
import { StudentInfoInterface, UserInterface, UserRole } from '../types';
import { HrInterface } from '../types';

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

    @OneToOne((type) => StudentInfo, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    studentInfo: StudentInfoInterface;

    @OneToOne((type) => Hr, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    hr: HrInterface;
}
