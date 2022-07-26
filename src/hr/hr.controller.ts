import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { HrService } from './hr.service';
import { StudentService } from '../student/student.service';
import {
    ActiveStudentsResponse, DisinterestStudentResponse, HiredStudentResponse, ReservationStudentResponse,
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
import { AllActiveStudentsDto } from '../student/dto/all-active-students.dto';
import { HiredStudentDto } from '../student/dto/hired-student.dto';
import { DisinterestStudentDto } from '../student/dto/disinterest-student.dto';

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
        @Query() query: AllActiveStudentsDto,
    ): Promise<ActiveStudentsResponse> {
        return this.studentService.findAllActiveStudents(query);
    }

    @Get('/interview')
    @Roles(UserRole.HR)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    findAllToInterview(
        @Query() query: AllActiveStudentsDto,
        @UserObj() user: User,
    ): Promise<StudentsToInterviewResponse> {
        return this.studentService.findAllToInterview(query, user);
    }

    @Get('/cv/:id')
    @Roles(UserRole.HR)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    showStudentCv(
        @Param('id') id: string,
    ): Promise<StudentInfoInterface> {
        return this.studentService.findOneCV(id);
    }

    @Patch('/reservation')
    @Roles(UserRole.HR)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    reservation(
        @Body() ReservationStudentDto: ReservationStudentDto,
        @UserObj() user: User,
    ): Promise<ReservationStudentResponse> {
        return this.studentService.reservation(ReservationStudentDto, user);
    }

    @Patch('/hired')
    @Roles(UserRole.HR)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    hired(
        @Body() hiredStudentDto: HiredStudentDto,
        @UserObj() user: User,
    ): Promise<HiredStudentResponse> {
        return this.studentService.hired(user, hiredStudentDto);
    }

    @Patch('/disinterest')
    @Roles(UserRole.HR)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    disinterest(
        @Body() disinterestStudentDto: DisinterestStudentDto,
    ): Promise<DisinterestStudentResponse> {
        return this.studentService.disinterest(disinterestStudentDto);
    }
}
