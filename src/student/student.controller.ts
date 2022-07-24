import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import {
  ActiveStudentsResponse,
  StudentCvProfilResponse,
  StudentForInterviewResponse,
  StudentResponse,
} from '../types';

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
  reservation(@Param('id') id: string, @Param('hrid') hrid: string) {
    return this.studentService.reservation(id, hrid);
  }
  @Patch('deactivation/:studentId')
  deactivation(@Param('studentId') studentId: string) {
    return this.studentService.deactivation(studentId);
  }
}
