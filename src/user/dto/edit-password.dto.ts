import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class EditPasswordDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  pwd: string;
  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  newPwd: string;
}
