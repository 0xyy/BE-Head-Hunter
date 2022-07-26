import { Inject, Injectable } from '@nestjs/common';
import { InsertStudentDto } from 'src/student/dto/insert-student.dto';
import { AdminStudentService } from '../student/admin-student.service';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';
import { isGithubUrl } from 'is-github-url';
import { User } from '../user/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @Inject(AdminStudentService)
    private adminStudentService: AdminStudentService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(MailService) private mailService: MailService,
  ) {}

  async CreateUsersFromFile(jsonfile: any) {
    console.log(jsonfile);
    // if typ pliku
    // if czy to json

    const failedUsersToInsert = [];

    const userData = JSON.parse(
      jsonfile.buffer.toString(),
    ) as InsertStudentDto[];

    for await (const user of userData) {
      //VALIDACJA
      if (!user.email.includes('@') || typeof user.email !== 'string') {
        return { isSuccess: false };
      }

      // validuj od 0 do 5
      if (
        !user.projectDegree ||
        typeof user.projectDegree !== 'number' ||
        user.projectDegree > 5 ||
        user.projectDegree < 0
      ) {
        return { isSuccess: false };
      }

      if (
        !user.courseEngagment ||
        typeof user.courseEngagment !== 'number' ||
        user.courseEngagment > 5 ||
        user.courseEngagment < 0
      ) {
        return { isSuccess: false };
      }

      if (
        !user.courseCompletion ||
        typeof user.courseCompletion !== 'number' ||
        user.courseCompletion > 5 ||
        user.courseCompletion < 0
      ) {
        return { isSuccess: false };
      }

      if (
        !user.teamProjectDegree ||
        typeof user.teamProjectDegree !== 'number' ||
        user.teamProjectDegree > 5 ||
        user.teamProjectDegree < 0
      ) {
        return { isSuccess: false };
      }

      if (
        !user.bonusProjectUrls ||
        !Array.isArray(user.bonusProjectUrls) ||
        user.bonusProjectUrls.length <= 0
      ) {
        user.bonusProjectUrls.forEach((project) => {
          const isValid = isGithubUrl(project);
          if (!isValid) {
            return { isSuccess: false };
          }
        });

        return { isSuccess: false };
      }

      //w try catch i dodaj do tablicy
      try {
        const response = await this.adminStudentService.insertStudent(user);
        console.log(response, 'res');
        if (response.isSuccess) {
          // response.userId;

          //generate token ma byc public

          // const token = await this.authService.generateToken(response.userId);
          console.log(user.email, user);
          await this.mailService.sendMail(
            user.email,
            'rejestracja kldfjskldf',
            'html do zrobienia',
          );
        }
      } catch (e) {
        failedUsersToInsert.push(user);
      }
    }

    return failedUsersToInsert;
  }
}
