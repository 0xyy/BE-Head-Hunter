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
    return this.hrService.createHr(body);
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
