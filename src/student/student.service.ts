import { Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';

import {
  ActiveStudentsResponse,
  StudentInfoInterface,
  StudentInfoUpdateResponse,
  StudentResponse,
  UserInterface,
} from '../types';
import { StudentInfo } from './entities/student-info.entity';
import { User } from '../user/user.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StudentService {
  constructor(private httpService: HttpService) {}

  private async getUser(id: string): Promise<User | null> {
    return await User.findOne({
      where: { id },
      relations: ['studentInfo'],
    });
  }

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
    user: UserInterface,
    studentInfo: StudentDto,
    avatarUrl: string | null,
  ): Promise<StudentInfoInterface> {
    const student = new StudentInfo();
    for (const key of Object.keys(studentInfo)) {
      student[key] = studentInfo[key];
    }
    student.avatarUrl = avatarUrl || null;
    student.user = user;
    try {
      return await student.save();
    } catch (e) {
      throw new Error('Stworzenie kursanta nie powiodło się');
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
      throw new Error('Aktualizacja kursanta nie powiodła się');
    }
  }
  findOne(id: string): StudentResponse {
    return undefined;
  }
  async findGithubAvatar(name) {
    try {
      const github = await this.httpService.axiosRef.get(
        `https://api.github.com/users/${name}`,
      );
      return {
        message: github.data.avatar_url || '',
        isSuccess: true,
      };
    } catch (e) {
      return {
        isSuccess: false,
      };
    }
  }
  async update(studentInfo: StudentDto): Promise<StudentInfoUpdateResponse> {
    const user = await this.getUser(studentInfo.userId);
    const avatarUrl = await this.findGithubAvatar(studentInfo.githubUsername);
    console.log(avatarUrl);
    if (!avatarUrl.isSuccess) {
      return {
        message: 'Nie znaleziono konta github.',
        isSuccess: false,
      };
    }
    if (!user) {
      return {
        message: 'Nie znaleziono użytkownika.',
        isSuccess: false,
      };
    }
    if (!user.active) {
      return {
        message: 'Użytkownik jest nieaktywny.',
        isSuccess: false,
      };
    }
    if (!user.studentInfo && user.active) {
      const newStudent = await this.createStudentInfo(
        user,
        studentInfo,
        avatarUrl.message,
      );
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
      message: 'Aktualizacja kursanta nie powiodła się',
      isSuccess: false,
    };
  }

  reservation() {
    // return `This action reservation a #${id} coursant by #${hrid} hr`;
  }

  findOneCV(id: string) {
    return undefined;
  }

  findAllForInterview(hrId: string) {
    return undefined;
  }

  deactivation() {
    return;
  }
}
