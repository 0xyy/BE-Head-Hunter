import { StudentProjectUrlInterface } from '../student';
import { UserInterface } from '../user';

export interface HrInterface {
    id: string;
    fullName: string;
    company: string;
    maxReservedStudents: number;
    studentsToInterview: StudentProjectUrlInterface[];
    user: UserInterface;
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
