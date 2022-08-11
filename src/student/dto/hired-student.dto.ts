import { IsNotEmpty, IsString } from 'class-validator';

export class HiredStudentDto {
    @IsString()
    @IsNotEmpty()
    studentId: string;
}