import { IsNotEmpty, IsString } from 'class-validator';

export class DeactivationStudentDto {
    @IsString()
    @IsNotEmpty()
    userId: string;
}
