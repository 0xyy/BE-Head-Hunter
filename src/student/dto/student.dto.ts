import {
  ExpectedContractType,
  ExpectedTypeWork,
  StudentStatus,
} from '../../types';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  studentInfoId: string | null;
  @IsString()
  @MaxLength(15)
  @ValidateIf((object, value) => value !== null)
  tel: string | null;
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  firstName: string;
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  githubUsername: string;
  @IsString({ each: true })
  @ValidateIf((object, value) => value !== null)
  portfolioUrls: string[] | null;
  @IsString({ each: true })
  projectUrls: string[];
  @IsString()
  @MaxLength(400)
  @ValidateIf((object, value) => value !== null)
  bio: string | null;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  targetWorkCity: string | null;
  @IsNumber()
  @Max(3)
  expectedTypeWork: ExpectedTypeWork;
  @IsNumber()
  @Max(3)
  expectedContractType: ExpectedContractType;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  education: string | null;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  expectedSalary: string | null;
  @IsBoolean()
  canTakeApprenticeship: boolean;
  @IsNumber()
  monthsOfCommercialExp: number;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  workExperience: string | null;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  courses: string | null;
  @IsNumber()
  @Max(2)
  status: StudentStatus;
}
