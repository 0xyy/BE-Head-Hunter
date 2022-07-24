import { Inject, Injectable } from '@nestjs/common';
import { AdminStudentService } from '../student/admin-student.service';
import * as fs from 'fs';

@Injectable()
export class AdminService {
  constructor(
    @Inject(AdminStudentService)
    private adminStudentService: AdminStudentService,
  ) {}

  async CreateUsersFromFile(jsonfile: File) {
    fs.readFile(jsonfile, 'utf8', (error, data) => {
      // 2
      if (error) {
        console.log(`ERROR: ${error}`);
        return;
      }

      // 3
      const jsonData = JSON.parse(data);

      // 4
      const parsedJsonData = jsonData;

      // 5
      // Check the keys that jsonData has
      console.log(Object.keys(jsonData));
    });
    return false;
  }
}
