import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { UserObj } from '../decorators/user-obj.decorator';
import { AuthLoginRequest } from '../types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async userLogin(
    @Body() req: AuthLoginRequest,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.login(req, res);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User, @Res() res: Response): Promise<any> {
    return this.authService.logout(user, res);
  }
  @Get('/auto-login')
  @UseGuards(AuthGuard('jwt'))
  async autoLogin(@UserObj() user: User, @Res() res: Response): Promise<any> {
    return this.authService.autoLogin(user, res);
  }
}
