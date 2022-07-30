import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { JwtPayload } from './jwt.strategy';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';
import { hashPwd } from '../utils/hash-pwd';
import { AuthLoginRequest, UserRole } from '../types';

@Injectable()
export class AuthService {
  public createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, process.env.JWT_KEY, { expiresIn });

    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;

    do {
      token = uuid();
      userWithThisToken = await User.findOne({
        where: {
          currentTokenId: token,
        },
      });
    } while (!!userWithThisToken);

    user.currentTokenId = token;
    await user.save();

    return token;
  }

  private getUserFullName = (user: User) => {
    if (user.role === UserRole.STUDENT) {
      return user.studentInfo?.firstName + user.studentInfo?.lastName;
    } else if (user.role === UserRole.HR) {
      return user.hr.fullName;
    } else {
      return 'ADMIN';
    }
  };
  private checkActiveUser = (user: User) => user.active === true;

  async login(req: AuthLoginRequest, res: Response) {
    try {
      const user = await User.findOne({
        where: {
          email: req.email,
        },
        relations: ['studentInfo', 'hr'],
      });

      if (!user) {
        return res.json({
          isSuccess: false,
          message: 'Niepoprawne dane logowania!',
        });
      }
      const password = hashPwd(req.pwd, user.salz);
      if (user.pwdHash !== password) {
        return res.json({
          isSuccess: false,
          message: 'Niepoprawne dane logowania!',
        });
      }

      if (!this.checkActiveUser(user)) {
        return res.json({
          isSuccess: false,
          message: 'Użytkownik jest nieaktywny!',
        });
      }
      const token = this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({
          isSuccess: true,
          userFullName: this.getUserFullName(user),
          userId: user.id,
          userRole: user.role,
          avatarUrl: user.studentInfo?.avatarUrl || null,
        });
    } catch (e) {
      return res.json({
        isSuccess: false,
        message: e.message,
      });
    }
  }

  async logout(user: User, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();

      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });

      return res.json({ isSuccess: true });
    } catch (e) {
      return res.json({
        isSuccess: false,
        error: e.message,
      });
    }
  }

  async autoLogin(user: User, res: Response) {
    if (!this.checkActiveUser(user)) {
      return res.json({
        isSuccess: false,
        message: 'Użytkownik jest nieaktywny!',
      });
    }
    const token = this.createToken(await this.generateToken(user));

    return res
      .cookie('jwt', token.accessToken, {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      })
      .json({
        isSuccess: true,
        userFullName: this.getUserFullName(user),
        userId: user.id,
        userRole: user.role,
        avatarUrl: user.studentInfo?.avatarUrl || null,
      });
  }
}
