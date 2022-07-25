import { Inject, Injectable } from '@nestjs/common';
import { EditPasswordDto } from './dto/edit-password.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { User } from './user.entity';
import { ActivateUserResponse, RecoverPasswordResponse } from '../types';
import { hashPwd, randomSalz } from '../utils/hash-pwd';
import { MailService } from 'src/mail/mail.service';
import { randomPassword } from '../utils/random-password';

@Injectable()
export class UserService {
  constructor(@Inject(MailService) private mailService: MailService) {}
  async editPassword(password: EditPasswordDto) {
    const user = await User.findOne({
      where: {
        id: password.userId,
      },
    });
    if (!user || user.pwdHash !== hashPwd(password.pwd, user.salz)) {
      return {
        isSuccess: false,
      };
    }
    user.pwdHash = hashPwd(password.newPwd, user.salz);
    await user.save();
    return {
      isSuccess: true,
    };
  }

  async recover(recover: RecoverPasswordDto): Promise<RecoverPasswordResponse> {
    const user = await User.findOne({
      where: {
        email: recover.email,
      },
    });
    if (!user) {
      return {
        isSuccess: false,
      };
    }
    const password = randomPassword();
    user.pwdHash = hashPwd(password, user.salz);

    this.mailService.sendMail(
      recover.email,
      'odzyskiwanie konta Megak Head-Hunter',
      `<p>Twoje nowe hasło to:${password}</p>`,
    );
    return {
      isSuccess: true,
    };
  }

  async activate(active: ActivateUserDto): Promise<ActivateUserResponse> {
    const { userId, token, password } = active;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        message: 'there is no such user.',
        isSuccess: false,
      };
    }
    if (user.active) {
      return {
        message: 'User is active.',
        isSuccess: false,
      };
    }
    if (user.activeTokenId !== token) {
      return {
        message: 'Wrong activation link.',
        isSuccess: false,
      };
    }
    const salz = randomSalz(128);
    user.pwdHash = hashPwd(password, salz);
    user.salz = salz;
    user.active = true;
    user.activeTokenId = null;
    await user.save();
    return {
      message: 'user has been activated',
      isSuccess: true,
    };
  }
}
