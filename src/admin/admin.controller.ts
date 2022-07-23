import {Body, Controller, Get, Inject, Patch} from '@nestjs/common';
import {AdminService} from "./admin.service";
import {RecoverPasswordDto} from "./dto/recoverPasswordDto";
import {EditPasswordDto} from "./dto/editPasswordDto";
import {
    EditPasswordResponse,
    RecoverPasswordResponse,
} from '../types';

@Controller('admin')
export class AdminController {
    constructor(@Inject(AdminService) private userService: AdminService) {}

    @Get('/allCoursants')
    getAllCoursants(): Promise<CoursantEntity[]> {
        return this.coursantService.getAll()
    }

    @Get('/allHR')
    getAllHR(): Promise<HREntity[]> {
        return this.hrService.getAll()
    }

    //import all coursant from file

    //add new hr

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
