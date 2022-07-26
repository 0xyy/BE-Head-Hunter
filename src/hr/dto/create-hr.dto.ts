import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateHrDto {
  @IsNotEmpty()
  @IsString()
  token: string;
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
  @Min(0)
  @Max(999)
  maxReservedStudents: number;
}
