import { Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import {
  ActiveStudentsResponse,
  StudentResponse,
} from '../types';

@Injectable()
export class StudentService {
  findAll(): ActiveStudentsResponse {
    return undefined;
  }

  findOne(id: string): StudentResponse {
    return undefined;
  }

  update(id: string, StudentDto: StudentDto) {
    return `This action updates a #${id} coursant`;
  }

  reservation(id: string, hrid: string) {
    return `This action reservation a #${id} coursant by #${hrid} hr`;
  }

  findOneCV(id: string) {
    return undefined;
  }

  findAllForInterview(hrId: string) {
    return undefined;
  }

  deactivation(studentId: string) {
    return;
  }
}
