import { UserInterface } from '../user';

export interface StudentInfoInterface {
    id: string;
    courseCompletion: number;
    courseEngagment: number;
    projectDegree: number;
    teamProjectDegree: number;
    bonusProjectUrls: StudentBonusProjectUrlInterface[];
    tel?: string;
    firstName: string;
    lastName: string;
    githubUsername: string; //Należy sprawdzić za pomocą API GH lub innym sposobem, czy taka osoba istnieje.
    portfolioUrls?: StudentPortfolioUrlInterface[]; //Tablica URL-i do portfolio.
    projectUrls: StudentProjectUrlInterface[]; //Tablica URL-i do GitHuba projektu zaliczeniowego.
    bio?: string;
    avatarUrl?: string;
    expectedTypeWork: ExpectedTypeWork;
    targetWorkCity?: string;
    expectedContractType: ExpectedContractType;
    expectedSalary?: string;
    canTakeApprenticeship: 'Tak' | 'Nie';
    monthsOfCommercialExp: number;
    education?: string;
    workExperience?: string;
    courses?: string;
    status: StudentStatus;
    user: UserInterface;
    reservationTo: Date;
}

export interface StudentBonusProjectUrlInterface {
    id: string;
    projectUrl: string;
    studentInfo: StudentInfoInterface;
}

export interface StudentPortfolioUrlInterface {
    id: string;
    projectUrl: string;
    studentInfo: StudentInfoInterface;
}

export interface StudentProjectUrlInterface {
    id: string;
    projectUrl: string;
    studentInfo: StudentInfoInterface;
}

export interface StudentAvailabilityViewInterface {
    studentId: string;
    firstName: string;
    lastName: string;
    courseCompletion: number;
    courseEngagment: number;
    projectDegree: number;
    teamProjectDegree: number;
    expectedTypeWork: ExpectedTypeWork;
    targetWorkCity?: string;
    expectedContractType: ExpectedContractType;
    expectedSalary?: string;
    canTakeApprenticeship: 'Tak' | 'Nie';
    monthsOfCommercialExp: number;
}

export interface StudentsToInterviewInterface extends StudentAvailabilityViewInterface {
    avatarUrl?: string;
    reservationTo: Date;
}

export enum StudentStatus {
    ACCESSIBLE,
    PENDING,
    EMPLOYED,
}

export enum ExpectedTypeWork {
    ALL,
    REMOTE,
    STATIONARY,
    HYBRID,
}

export enum ExpectedContractType {
    NOPREFERENCE,
    UOP,
    B2B,
    UZUOD,
}

export type StudentResponse = {
    userId: string;
    isSuccess: true;
};

export type ActiveStudentsResponse =
    {
        isSuccess: true;
        pageCount: number;
        students: StudentAvailabilityViewInterface[];
    };
export type StudentsToInterviewResponse =
    {
        isSuccess: true;
        pageCount: number;
        students: StudentsToInterviewInterface[];
    };

export type StudentInfoUpdateResponse =
    | {
    studentInfoId: string;
    isSuccess: true;
} | {
    message: string;
    isSuccess: false;
};
export type ReservationStudentResponse = {
    isSuccess: boolean;
    message: string
}