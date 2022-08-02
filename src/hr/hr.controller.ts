import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { HrService } from './hr.service';
import { StudentService } from '../student/student.service';
import {
    ActiveStudentsResponse, ReservationStudentResponse,
    StudentInfoInterface,
    StudentsToInterviewResponse,
    UserRole,
} from '../types';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../user/user.entity';
import { ReservationStudentDto } from '../student/dto/reservation-student.dto';

@Controller('/hr')
export class HrController {
    constructor(
        private readonly hrService: HrService,
        private readonly studentService: StudentService,
    ) {
    }

    @Get('/students/available')
    @Roles(UserRole.HR)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    AllActiveStudents(
        @Query('currentPage') currentPage: number,
        @Query('pageSize') pageSize: number,
    ): Promise<ActiveStudentsResponse> {
        return this.studentService.findAllActiveStudents(currentPage || 1, pageSize || 10);
    }

    @Get('interview/')
    @Roles(UserRole.HR)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    findAllToInterview(
        @Query('currentPage') currentPage: number,
        @Query('pageSize') pageSize: number,
        @UserObj() user: User,
    ): Promise<StudentsToInterviewResponse> {
        return this.studentService.findAllToInterview(currentPage || 1, pageSize || 10, user);
    }

    @Get('cv/:id')
    @Roles(UserRole.HR)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    showStudentCv(
        @Param('id') id: string,
    ):Promise<StudentInfoInterface> {
        return this.studentService.findOneCV(id);
    }

    @Patch('reservation')
    @Roles(UserRole.HR)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    reservation(
        @Body() ReservationStudentDto: ReservationStudentDto,
        @UserObj() user: User,
    ):Promise<ReservationStudentResponse> {
        return this.studentService.reservation(ReservationStudentDto,user);
    }
}
