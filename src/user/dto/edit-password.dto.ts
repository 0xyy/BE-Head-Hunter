import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class EditPasswordDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  pwd: string;
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  newPwd: string;
}
