import { StudentProjectUrlInterface } from '../student';
import { UserInterface } from '../user';
import { CreateHrDto } from '../../hr/dto/create-hr.dto';

export interface HrInterface {
  id: string;
  fullName: string;
  company: string;
  maxReservedStudents: number;
  studentsToInterview: StudentProjectUrlInterface[];
  user: UserInterface;
}

export type CreateHrRequest = CreateHrDto;

export type CreateHrResponse = {
  isSuccess: true;
  message: string;
};
