import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecoverPasswordDto } from './dto/recoverPasswordDto';
import { EditPasswordDto } from './dto/editPasswordDto';
import { EditPasswordResponse, RecoverPasswordResponse } from '../types';
import { UserService } from '../user/user.service';
import { HrService } from '../hr/hr.service';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';

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
  importUsersFromJSONFile(
    @UploadedFile() file,
    @Body() body,
  ): Promise<Boolean> {
    return this.adminService.CreateUsersFromFile(file);
  }
  //add new hr
  @Post(`/addHr`)
  addHRUser() {
    // @Body(), HR DTO
    // return this.hrService.createHRUser(data)
  }

  @Patch(`/edit`)
  editPassword(
    @Body() password: EditPasswordDto,
  ): Promise<EditPasswordResponse> {
    return this.userService.editPassword(password);
  }

  @Get(`/recover`)
  recoverPassword(
    @Body() recover: RecoverPasswordDto,
  ): Promise<RecoverPasswordResponse> {
    return this.userService.recover(recover);
  }
}
