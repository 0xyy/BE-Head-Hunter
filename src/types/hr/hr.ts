import { StudentProjectUrlInterface } from '../student';
import { UserInterface } from '../user';

export interface HrInterface {
  id: string;
  email: string;
  fullName: string;
  company: string;
  maxReservedStudents: number;
  studentsToInterview: StudentProjectUrlInterface[];
  user: UserInterface;
}
