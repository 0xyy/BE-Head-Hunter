import { HrStudentDto } from './hr-student.dto';

export class ResponseHrStudentsDto {
  currentPage: number;
  pageSize: number;
  pageCount: number;
  coursants: HrStudentDto[];
}
