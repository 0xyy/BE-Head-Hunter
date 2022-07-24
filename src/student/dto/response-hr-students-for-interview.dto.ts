import { HrStudentForInterviewDto } from './hr-student-for-interview.dto';

export class ResponseHrStudentsForInterviewDto {
  currentPage: number;
  pageSize: number;
  pageCount: number;
  coursants: HrStudentForInterviewDto[];
}
