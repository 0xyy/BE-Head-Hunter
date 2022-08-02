import { Controller, Get, Param, Query } from '@nestjs/common';
import { HrService } from './hr.service';
import { StudentService } from '../student/student.service';
import { ActiveStudentsResponse, StudentCvProfilResponse, StudentForInterviewResponse } from '../types';

@Controller('/hr')
export class HrController {
    constructor(
        private readonly hrService: HrService,
        private readonly studentService: StudentService,
    ) {
    }

    @Get('/students/available')
    AllActiveStudents(
        @Query('currentPage') currentPage: number,
        @Query('pageSize') pageSize: number,
            // @Query('pageCount') pageCount: number,
    ): Promise<ActiveStudentsResponse> {
        return this.studentService.findAllActiveStudents(currentPage || 0, 1);
    }

    @Get('interview/:hrId')
    findAllForInterview(
        @Param('hrId') hrId: string,
    ): StudentForInterviewResponse {
        return this.studentService.findAllForInterview(hrId);
    }

    @Get('cv/:id')
    showStudentCv(
        @Param('id') id: string,
    ): StudentCvProfilResponse {
        return this.studentService.findOneCV(id);
    }
}
