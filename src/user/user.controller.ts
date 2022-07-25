import { Body, Controller, Inject, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { EditPasswordDto } from './dto/edit-password.dto';
import {
  ActivateUserResponse,
  EditPasswordResponse,
  RecoverPasswordResponse,
} from '../types';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

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
  @Post(`/recover`)
  recoverPassword(
    @Body() recover: RecoverPasswordDto,
  ): Promise<RecoverPasswordResponse> {
    return this.userService.recover(recover);
  }
}
