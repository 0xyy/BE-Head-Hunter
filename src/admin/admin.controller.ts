import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HrService } from '../hr/hr.service';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateHrDto } from '../hr/dto/create-hr.dto';
import { UserRole } from '../types';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(HrService) private hrService: HrService,
    @Inject(AdminService) private adminService: AdminService,
  ) {}

  //import all coursant from file
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(`/createUsersFromFile`)
  @UseInterceptors(FileInterceptor('file'))
  importUsersFromJSONFile(@UploadedFile() file, @Body() body): Promise<{}> {
    return this.adminService.CreateUsersFromFile(file);
  }

  //add new hr
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(`/addHr`)
  addHRUser(@Body() body: CreateHrDto): Promise<any> {
    return this.adminService.createHr(body);
  }
}
