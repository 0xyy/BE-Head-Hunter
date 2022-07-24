import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { ResponseHrStudentsDto } from './dto/response-hr-students.dto';
import { StudentDto } from './dto/student.dto';
import { ResponseHrStudentsForInterviewDto } from './dto/response-hr-students-for-interview.dto';
import { CvStudentDto } from './dto/cv-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll(
    @Query('currentPage') currentPage: number,
    @Query('pageSize') pageSize: number,
    @Query('pageCount') pageCount: number,
  ): ResponseHrStudentsDto {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): StudentDto {
    return this.studentService.findOne(id);
  }

  @Get('interview/:hrId')
  findAllForInterview(
    @Param('hrId') hrId: string,
  ): ResponseHrStudentsForInterviewDto {
    return this.studentService.findAllForInterview(hrId);
  }

  @Get('cv/:id')
  findOneCV(@Param('id') id: string): CvStudentDto {
    return this.studentService.findOneCV(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() StudentDto: StudentDto) {
    return this.studentService.update(id, StudentDto);
  }

  @Patch('reservation/:id/:hrid')
  reservation(@Param('id') id: string, @Param('hrid') hrid: string) {
    return this.studentService.reservation(id, hrid);
  }
}
