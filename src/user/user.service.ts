import { Injectable } from '@nestjs/common';
import { EditPasswordDto } from './dto/edit-password.dto';
import { RecoverDto } from './dto/recover.dto';
import { ActivateUserDto } from './dto/ActivateUserDto';

@Injectable()
export class UserService {
  async editPassword(password: EditPasswordDto) {
    return Promise.resolve(undefined);
  }

  async recover(recover: RecoverDto) {
    return Promise.resolve(undefined);
  }

  async activate(active: ActivateUserDto) {
    return Promise.resolve(undefined);
  }
}
