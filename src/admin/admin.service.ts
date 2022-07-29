import { Inject, Injectable } from '@nestjs/common';
import { InsertStudentDto } from 'src/student/dto/insert-student.dto';
import { AdminStudentService } from '../student/admin-student.service';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';
import { isGithubUrl } from 'is-github-url';
import { CreateHrDto } from '../hr/dto/create-hr.dto';
import { HrService } from '../hr/hr.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdminService {
  constructor(
    @Inject(AdminStudentService)
    private adminStudentService: AdminStudentService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(MailService) private mailService: MailService,
    @Inject(HrService) private hrService: HrService,
  ) {}

  async CreateUsersFromFile(jsonfile: any) {
    console.log(jsonfile);

    //TODO CHECK IF JSON

    const failedUsersToInsert = {};
    let userNumber = 0;

    const userData = JSON.parse(
      jsonfile.buffer.toString(),
    ) as InsertStudentDto[];

    for await (const user of userData) {
      userNumber++;
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
        const isValid = isGithubUrl(projectUrl);
        if (!isValid) {
          validationErrors.push('bonusProjectUrls nie jest poprawny');
          continue;
        }
      }

      if (validationErrors.length > 0) {
        failedUsersToInsert[userNumber] = { user, errors: validationErrors };
        continue;
      }

      try {
        const response = await this.adminStudentService.insertStudent(user);
        console.log(response, 'res');
        if (response.isSuccess) {
          const token = this.authService.createToken(uuidv4());
          console.log(user.email, user);
          await this.mailService.sendMail(
            user.email,
            'rejestracja kldfjskldf',
            `html do zrobienia ${token} `,
          );
        }
      } catch (e) {
        validationErrors.push(e.message);
        failedUsersToInsert[userNumber] = { user, errors: validationErrors };
      }
    }

    return failedUsersToInsert;
  }

  async createHr(body: CreateHrDto) {
    const res = await this.hrService.createHr(body);
    if (res.isSuccess) {
      const token = await this.authService.createToken(uuidv4());
      await this.mailService.sendMail(
        body.email,
        'rejestracja kldfjskldf',
        `html do zrobienia ${token} `,
      );
      return {
        isSuccess: true,
      };
    }
    return;
  }
}
