import { IsNotEmpty, IsString } from 'class-validator';

export class ReservationStudentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  hrId: string;
}
