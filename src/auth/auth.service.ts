import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { JwtPayload } from './jwt.strategy';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from '../user/user.entity';
import { hashPwd } from '../utils/hash-pwd';

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(
      payload,
      'jda89dj98023u0 0u0 ))@)(#*)#*)@#*)(* )) u89dsijzhco 013- sdfdfmsdfsd,f,sf, ) @#)*)#*)#)(*#)(#)(#)(#)(# @!!!!!',
      { expiresIn },
    );

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

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const userByEmail = await User.findOne({
        where: {
          email: req.email,
        },
      });

      if (!userByEmail) {
        return res.json({ error: 'Invalid login data!' });
      }

      const user = await User.findOne({
        where: {
          pwdHash: hashPwd(req.pwd, userByEmail.salz),
        },
      });

      if (!user) {
        return res.json({ error: 'Invalid login data!' });
      }

      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
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

      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
