import { Injectable } from '@nestjs/common';
import { ResponseHrStudentsDto } from './dto/response-hr-students.dto';
import { StudentDto } from './dto/student.dto';
import { CvStudentDto } from './dto/cv-student.dto';
import { ResponseHrStudentsForInterviewDto } from './dto/response-hr-students-for-interview.dto';

@Injectable()
export class StudentService {
  findAll(): ResponseHrStudentsDto {
    return new ResponseHrStudentsDto();
  }

  findOne(id: string): StudentDto {
    return new StudentDto();
  }

  update(id: string, StudentDto: StudentDto) {
    return `This action updates a #${id} coursant`;
  }

  reservation(id: string, hrid: string) {
    return `This action reservation a #${id} coursant by #${hrid} hr`;
  }

  findOneCV(id: string): CvStudentDto {
    return new CvStudentDto();
  }

  findAllForInterview(hrId: string): ResponseHrStudentsForInterviewDto {
    return new ResponseHrStudentsForInterviewDto();
  }
}
