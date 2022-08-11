import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength, Min,
    MinLength,
} from 'class-validator';
import {
    ExpectedContractType,
    ExpectedTypeWork,
    StudentStatus
} from '../../types';

export class StudentDto {
    // @IsString()
    // @ValidateIf((object, value) => value !== null)
    // studentInfoId: string | null;

    @IsString()
    @MaxLength(15)
    // @ValidateIf((object, value) => value !== null)
    @IsOptional()
    tel?: string;

    @IsString()
    @MinLength(2)
    @MaxLength(60)
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    lastName: string;

    @IsString()
    @MinLength(2)
    @MaxLength(255)
    @IsNotEmpty()
    githubUsername: string;

    @IsString({ each: true })
    @IsOptional()
    portfolioUrls?: string[];

    @IsString({ each: true })
    @IsNotEmpty()
    projectUrls: string[];

    @IsString()
    @MaxLength(400)
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    targetWorkCity?: string;

    @IsString()
    @IsNotEmpty()
    expectedTypeWork: ExpectedTypeWork;

    @IsString()
    @IsNotEmpty()
    expectedContractType: ExpectedContractType;

    @IsString()
    @IsOptional()
    education?: string;

    @IsString()
    @IsOptional()
    expectedSalary?: string;

    @IsString()
    @IsNotEmpty()
    canTakeApprenticeship: string;

    @IsNumber()
    @IsNotEmpty()
    @Max(999)
    monthsOfCommercialExp: number;

    @IsString()
    @IsOptional()
    workExperience?: string;

    @IsString()
    @IsOptional()
    courses?: string;

    @IsNumber()
    @Max(2)
    @IsNotEmpty()
    status: StudentStatus;
}
