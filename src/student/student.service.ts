import { Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import {
  ActiveStudentsResponse,
  StudentResponse,
  StudentStatus,
  UserRole,
} from '../types';
import { StudentInfo } from './entities/student-info.entity';
import { User } from '../user/user.entity';

@Injectable()
export class StudentService {
  async findAllActiveStudents(
    currentPage,
    pageSize,
  ): Promise<ActiveStudentsResponse> {
    console.log(pageSize);
    console.log(currentPage);
    const students = await StudentInfo.find(); // querrybuilder
    if (!students) {
      return {
        message: 'Brak kursantów',
        isSuccess: false,
      };
    }
    const pageCount = Math.ceil(students.length / pageSize);
    return {
      isSuccess: true,
      pageCount,
    };
  }

  private createStudentInfo(studentInfo: StudentDto) {
    const student = new StudentInfo();
    for (const studentElement of Object.keys(studentInfo)) {
      console.log(studentElement);
    }
    // student.tel; = studentInfo.tel;
    // student.firstName = studentInfo.firstName
    // student.lastName = studentInfo.lastName
    // student.githubUsername = studentInfo.githubUsername
    // student.pro = studentInfo.pro
    // student. = studentInfo.
    // student. = studentInfo.
  }

  findOne(id: string): StudentResponse {
    return undefined;
  }

  async update(studentInfo: StudentDto) {
    const user = await User.findOne({
      where: { id: '123' },
      relations: ['studentInfo'],
    });
    if (!user) {
      return {
        isSuccess: false,
      };
    }
    if (user.studentInfo) {
      this.createStudentInfo(studentInfo);
    }

    return `This `;
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
