import { HrStudentDto } from './hr-student.dto';

export class HrStudentForInterviewDto extends HrStudentDto {
  avatar: string;
  fullName: string;
  reservationTo: Date;
}
