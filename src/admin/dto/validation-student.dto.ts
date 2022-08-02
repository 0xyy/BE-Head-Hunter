import { InsertStudentDto } from '../../student/dto/insert-student.dto';

export class ValidationStudentDto extends InsertStudentDto {
    validationErrors: string[];
}
