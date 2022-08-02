import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { StudentPortfolioUrl } from './student-portfolio-url.entity';
import { StudentProjectUrl } from './student-project-url.entity';
import { User } from '../../user/user.entity';
import { Hr } from '../../hr/entities/hr.entity';
import { StudentBonusProjectUrl } from './student-bonus-project-url.entity';
import {
    ExpectedContractType,
    ExpectedTypeWork,
    StudentBonusProjectUrlInterface,
    StudentInfoInterface,
    StudentPortfolioUrlInterface,
    StudentProjectUrlInterface,
    StudentStatus,
    UserInterface
} from '../../types';

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

    @Column({
        length: 60,
    })
    firstName: string;

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

    @Column({
        type: 'tinyint',
        default: 0,
    })
    expectedTypeWork: ExpectedTypeWork;

    @Column({
        length: 100,
        nullable: true,
    })
    targetWorkCity: string;

    @Column({
        type: 'tinyint',
        default: 0,
    })
    expectedContractType: ExpectedContractType;

    @Column({
        length: 8,
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

    @ManyToOne((type) => Hr, (entity) => entity.studentsToInterview, {
        onDelete: 'CASCADE',
    })

    @JoinColumn()
    hr: Hr;
}
