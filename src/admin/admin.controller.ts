import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HrService } from '../hr/hr.service';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateHrDto } from '../hr/dto/create-hr.dto';
import { CreateHrResponse } from '../types/hr';

@Controller('admin')
export class AdminController {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(HrService) private hrService: HrService,
    @Inject(AdminService) private adminService: AdminService,
  ) {}

  //import all coursant from file
  @Post(`/createUsersFromFile`)
  @UseInterceptors(FileInterceptor('file'))
  importUsersFromJSONFile(@UploadedFile() file, @Body() body): Promise<{}> {
    return this.adminService.CreateUsersFromFile(file);
  }
  //add new hr
  @Post(`/addHr`)
  addHRUser(@Body() body: CreateHrDto): Promise<CreateHrResponse> {
    return this.adminService.createHr(body);
  }
}
