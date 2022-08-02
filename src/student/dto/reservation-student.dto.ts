import { IsNotEmpty, IsString } from 'class-validator';

export class ReservationStudentDto {
    @IsString()
    @IsNotEmpty()
    studentId: string;
}
