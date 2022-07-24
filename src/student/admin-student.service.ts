import { Injectable } from '@nestjs/common';
import { StudentResponse, UserRole } from '../types';
import { User } from '../user/user.entity';
import { StudentCoursesDegree } from './entities/student-courses-degree.entity';
import { StudentBonusProjectUrl } from './entities/student-bonus-project-url.entity';
import { insertStudentDto } from './dto/insert-student.dto';

@Injectable()
export class AdminStudentService {
  private async insertBonusProjectUrl(
    projectUrls: string[],
    studentDegree: StudentCoursesDegree,
  ) {
    projectUrls.map(async (project) => {
      const insertUrl = new StudentBonusProjectUrl();
      insertUrl.projectUrl = project;
      insertUrl.studentCoursesDegree = studentDegree;
      await insertUrl.save();
      return insertUrl;
    });
  }

  private async insertStudentDegre(student: insertStudentDto, user) {
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
    student: insertStudentDto,
  ): Promise<StudentResponse> {
    try {
      const { email, token, bonusProjectUrls } = student;
      const user = new User();
      user.email = email;
      user.role = UserRole.STUDENT;
      user.activeTokenId = token;
      await user.save();
      const studentDegree = await this.insertStudentDegre(student, user);
      await this.insertBonusProjectUrl(bonusProjectUrls, studentDegree);
      user.studentCoursesDegree = studentDegree;
      await user.save();
      return { isSuccess: true };
    } catch (e) {
      throw new Error();
    }
  }
}
