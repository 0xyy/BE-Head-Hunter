import { IsNotEmpty, IsString } from 'class-validator';

export class DisinterestStudentDto {
    @IsString()
    @IsNotEmpty()
    studentId: string;
}