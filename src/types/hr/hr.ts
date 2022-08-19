import { UserInterface } from '../user';
import { StudentInfoInterface } from '../student';

export interface HrInterface {
    id: string;
    fullName: string;
    company: string;
    maxReservedStudents: number;
    studentsToInterview: HrToStudentInterface[];
    user: UserInterface;
}

export interface HrToStudentInterface {
    id: string;
    studentId: string;
    hrId: string;
    student: StudentInfoInterface;
    hr: HrInterface;
    reservationTo: Date;
}

export type AdminInsertHr = {
    token: string;
    email: string;
    fullName: string;
    company: string;
    maxReservedStudents: number;
};

export type AdminCreateHrResponse = {
    isSuccess: true;
    userId: string;
    message: string;
};
