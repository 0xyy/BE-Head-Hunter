import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ExpectedContractType, ExpectedTypeWork } from '../../types';

export class AllActiveStudentsDto {
    @IsNumber()
    @IsOptional()
    currentPage?: number = 1;

    @IsNumber()
    @IsOptional()
    pageSize?: number = 10;

    @IsString()
    @IsOptional()
    search?: string = '';

    @IsNumber()
    @IsOptional()
    courseCompletion?: number = 0;

    @IsNumber()
    @IsOptional()
    courseEngagment?: number = 0;

    @IsNumber()
    @IsOptional()
    projectDegree?: number = 0;

    @IsNumber()
    @IsOptional()
    teamProjectDegree?: number = 0;

    @IsString({ each: true })
    @IsOptional()
    expectedTypeWork?: ExpectedTypeWork[] = [];

    @IsString({ each: true })
    @IsOptional()
    expectedContractType?: ExpectedContractType[] = [];

    @IsString()
    @IsOptional()
    expectedSalaryMin?: string = '0';
    @IsString()
    @IsOptional()
    expectedSalaryMax?: string = '999999999';
    @IsString()
    @IsOptional()
    canTakeApprenticeship: 'Tak' | 'Nie' = 'Nie';

    @IsNumber()
    @IsOptional()
    monthsOfCommercialExp?: number = 0;
}