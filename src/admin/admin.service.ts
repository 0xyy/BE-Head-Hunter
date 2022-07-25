import { Inject, Injectable } from '@nestjs/common';
import { InsertStudentDto } from 'src/student/dto/insert-student.dto';
import { AdminStudentService } from '../student/admin-student.service';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';

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
    const userData = JSON.parse(
      jsonfile.buffer.toString(),
    ) as InsertStudentDto[];

    //czy user z danym email istnieje
    for await (const user of userData) {
      if (!user.email.includes('@') || typeof user.email !== 'string') {
        return { isSuccess: false };
      }

      if (!user.projectDegree || typeof user.projectDegree !== 'number') {
        return { isSuccess: false };
      }

      if (!user.courseEngagment || typeof user.courseEngagment !== 'number') {
        return { isSuccess: false };
      }

      if (!user.courseCompletion || typeof user.courseCompletion !== 'number') {
        return { isSuccess: false };
      }

      if (
        !user.teamProjectDegree ||
        typeof user.teamProjectDegree !== 'number'
      ) {
        return { isSuccess: false };
      }

      if (!user.bonusProjectUrls || typeof user.bonusProjectUrls !== 'object') {
        //is github proj is not empty
        return { isSuccess: false };
      }

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
      } else {
        // return { isSuccess: false };
      }
    }

    return false;
  }
}
