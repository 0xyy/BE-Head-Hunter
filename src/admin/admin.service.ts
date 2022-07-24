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

    //validacja coures notes
    //czy user z danym email istnieje
    //czy github w array
    for await (const user of userData) {
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
