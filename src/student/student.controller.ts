import { Controller, Body, Patch, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import { DeactivationStudentDto } from './dto/deactivation-student.dto';
import { DisinterestStudentDto } from './dto/disinterest-student.dto';
import { HiredStudentDto } from './dto/hired-student.dto';
import {
    DeactivationStudentResponse,
    DisinterestStudentResponse,
    HiredStudentResponse, StudentInfoUpdateResponse, UserRole,
} from '../types';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../user/user.entity';

@Controller('student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService,
    ) {
    }

    @Patch('/update')
    @Roles(UserRole.STUDENT)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    update(
        @Body() studentDto: StudentDto,
        @UserObj() user: User,
    ): Promise<StudentInfoUpdateResponse> {
        return this.studentService.update(user, studentDto);
    }

    @Patch('/deactivation')
    deactivation(
        @Body() deactivationStudentDto: DeactivationStudentDto,
    ): Promise<DeactivationStudentResponse> {
        return this.studentService.deactivation(deactivationStudentDto);
    }

    @Patch('/hired')
    hired(
        @Body() hiredStudentDto: HiredStudentDto,
    ): Promise<HiredStudentResponse> {
        return this.studentService.hired(hiredStudentDto);
    }

    @Patch('/disinterest')
    disinterest(
        @Body() disinterestStudentDto: DisinterestStudentDto,
    ): Promise<DisinterestStudentResponse> {
        return this.studentService.disinterest(disinterestStudentDto);
    }
}
