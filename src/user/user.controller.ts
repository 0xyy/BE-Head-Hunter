import { Body, Controller, Get, Inject, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { EditPasswordDto } from './dto/edit-password.dto';
import {
  ActivateUserResponse,
  EditPasswordResponse,
  RecoverPasswordResponse,
} from '../types';
import { RecoverDto } from './dto/recover.dto';
import { ActivateUserDto } from './dto/ActivateUserDto';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Patch(`/activate`)
  activeUser(@Body() active: ActivateUserDto): Promise<ActivateUserResponse> {
    return this.userService.activate(active);
  }
  @Patch(`/edit`)
  editPassword(
    @Body() password: EditPasswordDto,
  ): Promise<EditPasswordResponse> {
    return this.userService.editPassword(password);
  }
  @Get(`/recover`)
  recoverPassword(
    @Body() recover: RecoverDto,
  ): Promise<RecoverPasswordResponse> {
    return this.userService.recover(recover);
  }
}
