import {
  ExpectedContractType,
  ExpectedTypeWork,
  StudentStatus,
} from '../../types';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
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
  @IsNumber()
  @Max(3)
  @IsNotEmpty()
  expectedTypeWork: ExpectedTypeWork;
  @IsNumber()
  @Max(3)
  @IsNotEmpty()
  expectedContractType: ExpectedContractType;
  @IsString()
  @IsOptional()
  education?: string;
  @IsString()
  @IsOptional()
  expectedSalary?: string;
  @IsBoolean()
  @IsNotEmpty()
  canTakeApprenticeship: boolean;
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
