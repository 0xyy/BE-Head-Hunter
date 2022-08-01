import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { StudentBonusProjectUrl } from './entities/student-bonus-project-url.entity';
import { InsertStudentDto } from './dto/insert-student.dto';
import { StudentInfo } from './entities/student-info.entity';
import { StudentResponse, UserRole } from '../types';

@Injectable()
export class AdminStudentService {
    private async insertBonusProjectUrl(
        projectUrls: string[],
        studentInfo: StudentInfo,
    ) {
        projectUrls.map(async (project) => {
            const insertUrl = new StudentBonusProjectUrl();

            insertUrl.projectUrl = project;
            insertUrl.studentInfo = studentInfo;
            await insertUrl.save();

            return insertUrl;
        });
    }

    public async insertStudent(
        student: InsertStudentDto,
    ): Promise<StudentResponse> {
        const {
            email,
            token,
            bonusProjectUrls,
            courseCompletion,
            courseEngagment,
            projectDegree,
            teamProjectDegree,
        } = student;

        const checkUser = await User.findOne({ where: { email: email } });
        if (checkUser) {
            throw new HttpException(
                `Adres e-mail: "${email}" jest w bazie danych.`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        const user = new User();
        try {
            user.email = email;
            user.role = UserRole.STUDENT;
            user.activeTokenId = token;
            await user.save();

            const student = new StudentInfo();
            student.courseCompletion = courseCompletion;
            student.courseEngagment = courseEngagment;
            student.projectDegree = projectDegree;
            student.teamProjectDegree = teamProjectDegree;
            student.user = user;
            await student.save();

            await this.insertBonusProjectUrl(bonusProjectUrls, student);
            user.studentInfo = student;
            await user.save();

            return {
                userId: user.id,
                isSuccess: true,
            };
        } catch (e) {
            throw e(`Błąd dodania kursanta "${email}" do bazy danych.`);
        }
    }
}
