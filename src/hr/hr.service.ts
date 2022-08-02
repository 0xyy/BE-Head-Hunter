import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Hr } from './entities/hr.entity';
import { User } from '../user/user.entity';
import { AdminInsertHr, UserRole } from '../types';
import { AdminCreateHrResponse } from '../types';

@Injectable()
export class HrService {
    async getStudentsToTalk() {
        return;
    }

    async getAvailableStudents() {
        return;
    }

    async createHr(hr: AdminInsertHr): Promise<AdminCreateHrResponse> {
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
                `Dodanie użytkownika hr do tabeli w bazie User "${hr.email}" nie powiodło się.`
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
                `Dodanie  użytkownika do tabeli w bazie Hr "${hr.email}" nie powiodło się.`
            );
        }

        return {
            isSuccess: true,
            userId: user.id,
            message: `Dodanie Hr-a "${hr.email}" do bazy powiodło się`,
        };
    }
}
