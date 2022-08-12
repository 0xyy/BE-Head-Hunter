import { UserInterface } from '../user';

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
