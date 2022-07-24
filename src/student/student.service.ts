import { Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { ActiveStudentsResponse, StudentResponse, UserRole } from '../types';
import { User } from '../user/user.entity';
import { StudentCoursesDegree } from './entities/student-courses-degree.entity';
import { StudentBonusProjectUrl } from './entities/student-bonus-project-url.entity';

@Injectable()
export class StudentService {
  async insertBonusProjectUrl(
    projectUrls,
    studentDegree: StudentCoursesDegree,
  ): Promise<StudentBonusProjectUrl[]> {
    return await projectUrls.map(async (project) => {
      const insertUrl = new StudentBonusProjectUrl();
      insertUrl.projectUrl = project;
      insertUrl.studentCoursesDegree = studentDegree;
      await insertUrl.save();
      return insertUrl;
    });
  }

  async insertStudentDegre(student, user) {
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
  async insertStudent(student) {
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
  }

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
