import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  StudentCoursesDegreeInterface,
  StudentResponse,
  UserInterface,
  UserRole,
} from '../types';
import { User } from '../user/user.entity';
import { StudentCoursesDegree } from './entities/student-courses-degree.entity';
import { StudentBonusProjectUrl } from './entities/student-bonus-project-url.entity';
import { InsertStudentDto } from './dto/insert-student.dto';

@Injectable()
export class AdminStudentService {
  private async insertBonusProjectUrl(
    projectUrls: string[],
    studentDegree: StudentCoursesDegreeInterface,
  ) {
    projectUrls.map(async (project) => {
      const insertUrl = new StudentBonusProjectUrl();
      insertUrl.projectUrl = project;
      insertUrl.studentCoursesDegree = studentDegree;
      await insertUrl.save();
      return insertUrl;
    });
  }

  private async insertStudentDegree(
    student: InsertStudentDto,
    user: UserInterface,
  ) {
    const {
      courseCompletion,
      courseEngagment,
      projectDegree,
      teamProjectDegree,
    } = student;
    const studentDegree = new StudentCoursesDegree();
    studentDegree.courseCompletion = courseCompletion;
    studentDegree.courseEngagment = courseEngagment;
    studentDegree.projectDegree = projectDegree;
    studentDegree.teamProjectDegree = teamProjectDegree;
    studentDegree.user = user;
    return await studentDegree.save();
  }
  public async insertStudent(
    student: InsertStudentDto,
  ): Promise<StudentResponse> {
    const { email, token, bonusProjectUrls } = student;
    const checkUser = await User.findOne({ where: { email: email } });
    if (checkUser) {
      throw new HttpException(
        `Adres e-mail: "${email}" jest w bazie danych.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const user = new User();
      user.email = email;
      user.role = UserRole.STUDENT;
      user.activeTokenId = token;
      await user.save();
      const studentDegree = await this.insertStudentDegree(student, user);
      await this.insertBonusProjectUrl(bonusProjectUrls, studentDegree);
      user.studentCoursesDegree = studentDegree;
      await user.save();
      return {
        userId: user.id,
        isSuccess: true,
      };
    } catch (e) {
      throw e(`Błąd dodania kursanta "${email}" do bazy danych.`);
    }
  }
}
