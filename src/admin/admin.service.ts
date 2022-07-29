import { Inject, Injectable } from '@nestjs/common';
import { InsertStudentDto } from 'src/student/dto/insert-student.dto';
import { AdminStudentService } from '../student/admin-student.service';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';
import { CreateHrDto } from './dto/create-hr.dto';
import { HrService } from '../hr/hr.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateHrResponse, InsertStudentResponse } from '../types';

@Injectable()
export class AdminService {
  constructor(
    @Inject(AdminStudentService)
    private adminStudentService: AdminStudentService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(MailService) private mailService: MailService,
    @Inject(HrService) private hrService: HrService,
  ) {}

  async CreateUsersFromFile(jsonfile: any): Promise<InsertStudentResponse> {
    //TODO CHECK IF JSON
    const failedUsersToInsert = [];
    const userData = JSON.parse(
      jsonfile.buffer.toString(),
    ) as InsertStudentDto[];
    const countUser = userData.length;

    for await (const user of userData) {
      const validationErrors = [];

      if (!user.email.includes('@') || typeof user.email !== 'string') {
        validationErrors.push('email nie jest poprawny');
      }

      if (
        !user.projectDegree ||
        typeof user.projectDegree !== 'number' ||
        user.projectDegree > 5 ||
        user.projectDegree < 0
      ) {
        validationErrors.push(
          'projectDegree nie jest liczba, albo jest większy od 5 lub mniejszy niz 0',
        );
      }

      if (
        !user.courseEngagment ||
        typeof user.courseEngagment !== 'number' ||
        user.courseEngagment > 5 ||
        user.courseEngagment < 0
      ) {
        validationErrors.push(
          'courseEngagment nie jest liczba, albo jest większy od 5 lub mniejszy niz 0',
        );
      }

      if (
        !user.courseCompletion ||
        typeof user.courseCompletion !== 'number' ||
        user.courseCompletion > 5 ||
        user.courseCompletion < 0
      ) {
        validationErrors.push(
          'courseCompletion nie jest liczba, albo jest większy od 5 lub mniejszy niz 0',
        );
      }

      if (
        !user.teamProjectDegree ||
        typeof user.teamProjectDegree !== 'number' ||
        user.teamProjectDegree > 5 ||
        user.teamProjectDegree < 0
      ) {
        validationErrors.push(
          'teamProjectDegree nie jest liczba, albo jest większy od 5 lub mniejszy niz 0',
        );
      }

      if (
        !user.bonusProjectUrls ||
        !Array.isArray(user.bonusProjectUrls) ||
        user.bonusProjectUrls.length <= 0
      ) {
        validationErrors.push('bonusProjectUrls nie istnieje');
      }

      for (const projectUrl of user.bonusProjectUrls) {
        const isValid = projectUrl.includes('github');
        console.log(isValid);
        if (!isValid) {
          validationErrors.push('bonusProjectUrls nie jest poprawny');
          continue;
        }
      }

      if (validationErrors.length > 0) {
        failedUsersToInsert.push({ user, errors: validationErrors });
        continue;
      }

      try {
        const response = await this.adminStudentService.insertStudent(user);
        if (response.isSuccess) {
          const token = this.authService.createToken(uuidv4());
          await this.mailService.sendMail(
            user.email,
            'rejestracja użytkownika',
            `html do zrobienia ${process.env.ACTIVATE_LINK}/${response.userId}/${token}/ `,
          );
        }
      } catch (e) {
        validationErrors.push(e.message);
        failedUsersToInsert.push({ user, errors: validationErrors });
      }
    }
    if (failedUsersToInsert.length === 0) {
      return {
        countSuccess: countUser,
        isSuccess: true,
      };
    } else
      return {
        isSuccess: false,
        countSuccess: countUser - failedUsersToInsert.length,
        countFailed: failedUsersToInsert.length,
        users: failedUsersToInsert,
      };
  }

  async createHr(body: CreateHrDto): Promise<CreateHrResponse> {
    const token = this.authService.createToken(uuidv4());
    try {
      const response = await this.hrService.createHr({
        ...body,
        token: token.accessToken,
      });
      if (response.isSuccess) {
        await this.mailService.sendMail(
          body.email,
          'rejestracja użytkownika',
          `html do zrobienia ${process.env.ACTIVATE_LINK}/${response.userId}/${token.accessToken}/  `,
        );
      }
      return {
        isSuccess: true,
      };
    } catch (e) {
      return {
        isSuccess: false,
        message: e.message,
      };
    }
  }
}
