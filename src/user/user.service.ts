import { Injectable } from '@nestjs/common';
import { EditPasswordDto } from './dto/edit-password.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { User } from './user.entity';
import { ActivateUserResponse } from '../types';
import { hashPwd, randomSalz } from '../utils/hash-pwd';

@Injectable()
export class UserService {
  async editPassword(password: EditPasswordDto) {
    return Promise.resolve(undefined);
  }

  async recover(recover: RecoverPasswordDto) {
    return Promise.resolve(undefined);
  }

  async activate(active: ActivateUserDto): Promise<ActivateUserResponse> {
    const { userId, token, password } = active;
    const user = await User.findOne({
      where: {
        id: userId,
        active: false,
        activeTokenId: token,
      },
    });
    if (!user) {
      return { isSuccess: false };
    }
    const salz = randomSalz(128);
    user.pwdHash = hashPwd(password, salz);
    user.salz = salz;
    user.active = true;
    user.activeTokenId = null;
    await user.save();
    return {
      isSuccess: true,
    };
  }
}
