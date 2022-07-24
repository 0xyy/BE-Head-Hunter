import { Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import {
  ActiveStudentsResponse,
  StudentInfoInterface,
  StudentInfoUpdateResponse,
  StudentResponse,
} from '../types';
import { StudentInfo } from './entities/student-info.entity';
import { User } from '../user/user.entity';

@Injectable()
export class StudentService {
  async findAllActiveStudents(
    currentPage,
    pageSize,
  ): Promise<ActiveStudentsResponse> {
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

  private async createStudentInfo(
    studentInfo: StudentDto,
  ): Promise<StudentInfoInterface> {
    const student = new StudentInfo();
    for (const key of Object.keys(studentInfo)) {
      student[key] = studentInfo[key];
    }
    try {
      return await student.save();
    } catch (e) {
      throw new Error();
    }
  }

  private async updateStudentInfo(
    id: string,
    studentInfo: StudentDto,
  ): Promise<StudentInfoInterface> {
    try {
      const oldStudentInfo = await StudentInfo.findOneOrFail({ where: { id } });
      for (const key of Object.keys(studentInfo)) {
        oldStudentInfo[key] = studentInfo[key];
      }
      await oldStudentInfo.save();
      return oldStudentInfo;
    } catch (e) {
      throw new Error();
    }
  }

  findOne(id: string): StudentResponse {
    return undefined;
  }

  async update(studentInfo: StudentDto): Promise<StudentInfoUpdateResponse> {
    const user = await User.findOne({
      where: { id: studentInfo.userId },
      relations: ['studentInfo'],
    });
    if (!user) {
      return {
        isSuccess: false,
      };
    }
    if (!user.studentInfo && user.active) {
      const newStudent = await this.createStudentInfo(studentInfo);
      user.studentInfo = newStudent;
      await user.save();

      return {
        studentInfoId: newStudent.id,
        isSuccess: true,
      };
    } else if (user.studentInfo && user.active) {
      const student = await this.updateStudentInfo(
        user.studentInfo.id,
        studentInfo,
      );
      return {
        studentInfoId: student.id,
        isSuccess: true,
      };
    }
    return {
      isSuccess: false,
    };
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
