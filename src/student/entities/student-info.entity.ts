import {
    BaseEntity,
    Column,
    Entity, Index,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentPortfolioUrl } from './student-portfolio-url.entity';
import { StudentProjectUrl } from './student-project-url.entity';
import { User } from '../../user/user.entity';
import { StudentBonusProjectUrl } from './student-bonus-project-url.entity';
import {
    ExpectedContractType,
    ExpectedTypeWork,
    HrToStudentInterface,
    StudentBonusProjectUrlInterface,
    StudentInfoInterface,
    StudentPortfolioUrlInterface,
    StudentProjectUrlInterface,
    StudentStatus,
    UserInterface,
} from '../../types';
import { HrToStudentEntity } from '../../hr/entities/hr-to.student.entity';

@Entity()
export class StudentInfo extends BaseEntity implements StudentInfoInterface {
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

    @OneToMany((type) => StudentBonusProjectUrl, (entity) => entity.studentInfo)
    @JoinColumn()
    bonusProjectUrls: StudentBonusProjectUrlInterface[];

    @Column({
        length: '15',
        nullable: true,
    })
    tel: string;

    @Index({ fulltext: true })
    @Column({
        length: 60,
    })
    firstName: string;

    @Index({ fulltext: true })
    @Column({
        length: 100,
    })
    lastName: string;

    @Column({
        length: 255,
        unique: true,
        default: null,
        nullable: true,
    })
    githubUsername: string; //Należy sprawdzić za pomocą API GH lub innym sposobem, czy taka osoba istnieje.

    @OneToMany((type) => StudentPortfolioUrl, (entity) => entity.studentInfo, {
        nullable: true,
    })
    portfolioUrls: StudentPortfolioUrlInterface[]; //Tablica URL-i do portfolio.

    @OneToMany((type) => StudentProjectUrl, (entity) => entity.studentInfo)
    projectUrls: StudentProjectUrlInterface[]; //Tablica URL-i do GitHuba projektu zaliczeniowego.

    @Column({
        type: 'varchar',
        length: '400',
        nullable: true,
    })
    bio: string;

    @Column({
        default: null,
        nullable: true,
    })
    avatarUrl: string | null;

    @Index({ fulltext: true })
    @Column({
        type: 'varchar',
        length: 20,
        default: ExpectedTypeWork.ALL,
    })
    expectedTypeWork: ExpectedTypeWork;

    @Index({ fulltext: true })
    @Column({
        length: 100,
        nullable: true,
    })
    targetWorkCity: string;

    @Index({ fulltext: true })
    @Column({
        type: 'varchar',
        length: 20,
        default: ExpectedContractType.NOPREFERENCE,
    })
    expectedContractType: ExpectedContractType;

    @Column({
        length: 8,
        default: '0',
        nullable: true,
    })
    expectedSalary: string;

    @Column({
        length: 3,
        default: 'Nie',
    })
    canTakeApprenticeship: 'Tak' | 'Nie';

    @Column({
        type: 'tinyint',
        default: 0,
    })
    monthsOfCommercialExp: number;

    @Column({
        type: 'text',
        nullable: true,
    })
    education: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    workExperience: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    courses: string;

    @Column({
        type: 'tinyint',
        default: 0,
    })
    status: StudentStatus;

    @OneToOne((type) => User, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: UserInterface;

    @OneToMany((type) => HrToStudentEntity, (entity) => entity.student, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    hrs: HrToStudentInterface[];
}
