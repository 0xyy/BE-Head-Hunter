import { PartialType } from '@nestjs/mapped-types';
import { CreateCoursantDto } from './create-coursant.dto';

export class UpdateCoursantDto extends PartialType(CreateCoursantDto) {
    id: string;
    email: string;
    tel: string;
    firstName: string;
    lastName: string;
    githubUsername: string;
    portfolioUrls: string[];
    projectUrls: string[];
    bio: string;
    expectedTypeWork: string;
    targetWorkCity: string;
    expectedContractType: string;
    expectedSalary: string;
    monthsOfCommercialExp: number;
    education: string;
    workExperience: string;
    courses: string;
}
