import { Controller, Body, Patch } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import { DeactivationStudentDto } from './dto/deactivation-student.dto';
import { DisinterestStudentDto } from './dto/disinterest-student.dto';
import { HiredStudentDto } from './dto/hired-student.dto';
import {
    DeactivationStudentResponse,
    DisinterestStudentResponse,
    HiredStudentResponse, StudentInfoUpdateResponse,
} from '../types';

@Controller('student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService,
    ) {
    }

    @Patch('/update')
    update(
        @Body() studentDto: StudentDto,
    ): Promise<StudentInfoUpdateResponse> {
        return this.studentService.update(studentDto);
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
