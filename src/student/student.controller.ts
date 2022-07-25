import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import {
  ActiveStudentsResponse,
  StudentCvProfilResponse,
  StudentForInterviewResponse,
  StudentResponse,
} from '../types';
import { DeactivationStudentDto } from './dto/deactivation-student.dto';
import { ReservationStudentDto } from './dto/reservation-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  AllActiveStudents(
    @Query('currentPage') currentPage: number,
    @Query('pageSize') pageSize: number,
    // @Query('pageCount') pageCount: number,
  ): Promise<ActiveStudentsResponse> {
    return this.studentService.findAllActiveStudents(currentPage || 0, 1);
  }

  @Get(':id')
  findOne(@Param('id') id: string): StudentResponse {
    return this.studentService.findOne(id);
  }

  @Get('interview/:hrId')
  findAllForInterview(
    @Param('hrId') hrId: string,
  ): StudentForInterviewResponse {
    return this.studentService.findAllForInterview(hrId);
  }

  @Get('cv/:id')
  findOneCV(@Param('id') id: string): StudentCvProfilResponse {
    return this.studentService.findOneCV(id);
  }

  @Patch('update')
  update(@Body() StudentDto: StudentDto) {
    return this.studentService.update(StudentDto);
  }

  @Patch('reservation/:id/:hrid')
  reservation(@Body() ReservationStudentDto: ReservationStudentDto) {
    return this.studentService.reservation(ReservationStudentDto);
  }
  @Patch('deactivation')
  deactivation(@Body() DeactivationStudentDto: DeactivationStudentDto) {
    return this.studentService.deactivation(DeactivationStudentDto);
  }
}
