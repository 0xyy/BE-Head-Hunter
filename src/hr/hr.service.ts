import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHrDto } from './dto/create-hr.dto';
import { Hr } from './entities/hr.entity';
import { User } from '../user/user.entity';
import { UserRole } from '../types';
import { CreateHrResponse } from '../types/hr';

@Injectable()
export class HrService {
  async getStudentsToTalk() {
    return;
  }

  async getAvailableStudents() {
    return;
  }

  async createHr(hr: CreateHrDto): Promise<CreateHrResponse> {
    const checkUser = await User.findOne({ where: { email: hr.email } });
    if (checkUser) {
      throw new HttpException(
        `Adres e-mail: "${hr.email}" jest w bazie danych.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const user = new User();
    const newHr = new Hr();

    try {
      user.email = hr.email;
      user.role = UserRole.HR;
      user.activeTokenId = hr.token;
      await user.save();
    } catch (e) {
      throw e(
        `Dodanie użytkownika hr do tabeli w bazie User "${hr.email}" nie powiodło się.`,
      );
    }
    try {
      newHr.user = user;
      newHr.company = hr.company;
      newHr.maxReservedStudents = hr.maxReservedStudents;
      newHr.fullName = hr.fullName;
      await newHr.save();
      user.hr = newHr;
      await user.save();
    } catch (e) {
      throw e(
        `Dodanie  użytkowniak do tabeli w bazie Hr "${hr.email}" nie powiodło się.`,
      );
    }
    return {
      isSuccess: true,
      message: `Dodanie Hr-a "${hr.email}" do bazy powiodło się`,
    };
  }
}
