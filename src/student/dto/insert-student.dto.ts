import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsString,
    Max,
    Min
} from 'class-validator';

export class InsertStudentDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Min(0)
    @Max(5)
    @IsNotEmpty()
    courseCompletion: number;

    @Min(0)
    @Max(5)
    @IsNotEmpty()
    courseEngagment: number;

    @Min(0)
    @Max(5)
    @IsNotEmpty()
    projectDegree: number;

    @Min(0)
    @Max(5)
    @IsNotEmpty()
    teamProjectDegree: number;

    @IsNotEmpty()
    @IsString()
    token: string;

    @IsArray()
        //@IsUrl() add validation url.
    bonusProjectUrls: string[];
}
