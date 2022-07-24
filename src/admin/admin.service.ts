import { Inject, Injectable } from '@nestjs/common';
import { InsertStudentDto } from 'src/student/dto/insert-student.dto';
import { AdminStudentService } from '../student/admin-student.service';

@Injectable()
export class AdminService {
  constructor(
    @Inject(AdminStudentService)
    private adminStudentService: AdminStudentService,
  ) {}

  async CreateUsersFromFile(jsonfile: any) {
    console.log(jsonfile);
    // if typ pliku
    // if czy to json
    const userData = JSON.parse(
      jsonfile.buffer.toString(),
    ) as InsertStudentDto[];
    userData.forEach(async (user) => {
      //validacja coures notes
      //czy user z danym email istnieje
      //czy github w array

      const { id } = await this.adminStudentService.insertStudent(user);

      //generate activetoken
      //send email
    });

    return false;
  }
}
