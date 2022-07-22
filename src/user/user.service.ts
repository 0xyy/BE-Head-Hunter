import { Injectable } from '@nestjs/common';
import { EditPasswordDto } from './dto/edit-password.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UserService {
  async editPassword(password: EditPasswordDto) {
    return Promise.resolve(undefined);
  }

  async recover(recover: RecoverPasswordDto) {
    return Promise.resolve(undefined);
  }

  async activate(active: ActivateUserDto) {
    return Promise.resolve(undefined);
  }
}
