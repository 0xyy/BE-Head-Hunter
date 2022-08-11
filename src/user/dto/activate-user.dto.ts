import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ActivateUserDto {
    @MinLength(2)
    @MaxLength(255)
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
