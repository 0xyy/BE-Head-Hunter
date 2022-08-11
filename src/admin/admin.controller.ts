import {
    Body,
    Controller,
    Inject,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { HrService } from '../hr/hr.service';
import { AdminService } from './admin.service';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CreateHrDto } from './dto/create-hr.dto';
import { CreateHrResponse, InsertStudentResponse, UserRole } from '../types';

@Controller('admin')
export class AdminController {
    constructor(
        @Inject(UserService) private userService: UserService,
        @Inject(HrService) private hrService: HrService,
        @Inject(AdminService) private adminService: AdminService,
    ) {}

    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('/createUsersFromFile')
    @UseInterceptors(FileInterceptor('file'))
    importUsersFromJSONFile(
        @UploadedFile() file,
        @Body() body,
    ): Promise<InsertStudentResponse> {
        return this.adminService.createUsersFromFile(file);
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('/addHr')
    addHRUser(
        @Body() body: CreateHrDto,
    ): Promise<CreateHrResponse> {
        return this.adminService.createHr(body);
    }
}
