import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EditPasswordDto } from './dto/edit-password.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { User } from './user.entity';
import {
  ActivateUserResponse,
  EditPasswordResponse,
  RecoverPasswordResponse,
} from '../types';
import { hashPwd, randomSalz } from '../utils/hash-pwd';
import { MailService } from '../mail/mail.service';
import { randomPassword } from '../utils/random-password';

@Injectable()
export class UserService {
  constructor(@Inject(MailService) private mailService: MailService) {}
  async editPassword(
    password: EditPasswordDto,
    user: User,
  ): Promise<EditPasswordResponse> {
    if (user.pwdHash !== hashPwd(password.pwd, user.salz)) {
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

    await this.mailService.sendMail(
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
      throw new BadRequestException('Nie znaleziono użytkownika.');
    }
    if (user.active) {
      throw new BadRequestException('Użytkownik jest już aktywny.');
    }
    if (user.activeTokenId !== token) {
      throw new BadRequestException(
        'Podany link aktywacyjny jest nieaktywny. Proszę się skontaktować z administratorem.',
      );
    }
    const salz = randomSalz(128);
    user.pwdHash = hashPwd(password, salz);
    user.salz = salz;
    user.active = true;
    user.activeTokenId = null;
    await user.save();
    return {
      message: 'Użytkownik został aktywowany',
      isSuccess: true,
    };
  }
}
