import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateHrDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(999)
  maxReservedStudents: number;
}
