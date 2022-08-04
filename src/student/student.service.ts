import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { User } from '../user/user.entity';
import { StudentInfo } from './entities/student-info.entity';
import { ReservationStudentDto } from './dto/reservation-student.dto';
import { DeactivationStudentDto } from './dto/deactivation-student.dto';
import { StudentDto } from './dto/student.dto';
import {
    ActiveStudentsResponse, DisinterestStudentResponse,
    HiredStudentResponse,
    ReservationStudentResponse,
    StudentAvailabilityViewInterface,
    StudentInfoInterface,
    StudentInfoUpdateResponse,
    StudentStatus,
    StudentsToInterviewInterface,
    StudentsToInterviewResponse,
    UserRole,
} from '../types';
import { MailService } from '../mail/mail.service';
import { HiredStudentDto } from './dto/hired-student.dto';
import { DisinterestStudentDto } from './dto/disinterest-student.dto';

@Injectable()
export class StudentService {
    constructor(
        private httpService: HttpService,
        private mailService: MailService,
    ) {
    }

    private async getUser(id: string): Promise<User> {
        try {
            return await User.findOneOrFail({
                where: { id },
                relations: ['StudentInfo'],
            });
        } catch (e) {
            throw new BadRequestException('Nie ma takiego kursanta.');
        }
    }

    private async getStudent(id: string): Promise<StudentInfo> {
        try {
            return await StudentInfo.findOneOrFail({
                where: { id },
                relations: ['user'],
            });
        } catch (e) {
            throw new BadRequestException('Nie ma takiego kursanta.');
        }
    }

    private filterAvailabilityStudent = (students: StudentInfoInterface[]): StudentAvailabilityViewInterface[] => {
        return students.map(student => {
            const {
                id: studentId,
                firstName,
                lastName,
                courseCompletion,
                courseEngagment,
                projectDegree,
                teamProjectDegree,
                expectedTypeWork,
                targetWorkCity,
                expectedContractType,
                expectedSalary,
                canTakeApprenticeship,
                monthsOfCommercialExp,
            } = student;
            return {
                studentId,
                firstName,
                lastName,
                courseCompletion,
                courseEngagment,
                projectDegree,
                teamProjectDegree,
                expectedTypeWork,
                targetWorkCity,
                expectedContractType,
                expectedSalary,
                canTakeApprenticeship,
                monthsOfCommercialExp,
            };
        });
    };

    private filterStudentsToInterview = (students: StudentInfoInterface[]): StudentsToInterviewInterface[] => {
        return students.map(student => {
            const {
                id: studentId,
                firstName,
                lastName,
                courseCompletion,
                courseEngagment,
                projectDegree,
                teamProjectDegree,
                expectedTypeWork,
                targetWorkCity,
                expectedContractType,
                expectedSalary,
                canTakeApprenticeship,
                monthsOfCommercialExp,
                avatarUrl,
                reservationTo,
            } = student;
            return {
                studentId,
                firstName,
                lastName,
                courseCompletion,
                courseEngagment,
                projectDegree,
                teamProjectDegree,
                expectedTypeWork,
                targetWorkCity,
                expectedContractType,
                expectedSalary,
                canTakeApprenticeship,
                monthsOfCommercialExp,
                avatarUrl,
                reservationTo,
            };
        });
    };

    async findAllActiveStudents(
        currentPage: number,
        pageSize: number,
    ): Promise<ActiveStudentsResponse> {
        try {
            const [students, count] = await StudentInfo.findAndCount({
                where: {
                    status: StudentStatus.ACCESSIBLE,
                },
                take: pageSize,
                skip: pageSize * (currentPage - 1),
            });
            const pageCount = Math.ceil(count / pageSize);
            return {
                isSuccess: true,
                pageCount,
                students: this.filterAvailabilityStudent(students),
            };
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async findAllToInterview(
        currentPage: number,
        pageSize: number,
        user: User,
    ): Promise<StudentsToInterviewResponse> {
        try {
            const [students, count] = await StudentInfo.findAndCount({
                where: {
                    hr: user.hr,
                },
                take: pageSize,
                skip: pageSize * (currentPage - 1),
            });
            const pageCount = Math.ceil(count / pageSize);
            return {
                isSuccess: true,
                pageCount,
                students: this.filterStudentsToInterview(students),
            };
        } catch (e) {
            throw new Error(e.message);
        }
    }

    private async updateStudentInfo(
        id: string,
        studentInfo: StudentDto,
        avatarUrl: string | null,
    ): Promise<StudentInfoInterface> {
        try {
            const oldStudentInfo = await StudentInfo.findOneOrFail({ where: { id } });
            for (const key of Object.keys(studentInfo)) {
                oldStudentInfo[key] = studentInfo[key];
            }
            oldStudentInfo.avatarUrl = avatarUrl || null;
            await oldStudentInfo.save();
            return oldStudentInfo;
        } catch (e) {
            throw new Error('Aktualizacja kursanta nie powiodła się');
        }
    }

    private async findGithubAvatar(name) {
        try {
            const github = await this.httpService.axiosRef.get(
                `https://api.github.com/users/${name}`,
            );
            return {
                message: github.data.avatar_url || '',
                isSuccess: true,
            };
        } catch (e) {
            return {
                isSuccess: false,
                message: 'Nie znaleziono avatara na github.',
            };
        }
    }

    async update(studentInfo: StudentDto): Promise<StudentInfoUpdateResponse> {
        try {
            const user = await this.getUser(studentInfo.userId);
            const avatarUrl = await this.findGithubAvatar(studentInfo.githubUsername);
            if (!avatarUrl.isSuccess) {
                return {
                    message: 'Nie znaleziono konta github.',
                    isSuccess: false,
                };
            }
            if (!user) {
                return {
                    message: 'Nie znaleziono użytkownika.',
                    isSuccess: false,
                };
            }
            if (!user.active) {
                return {
                    message: 'Użytkownik jest nieaktywny.',
                    isSuccess: false,
                };
            }
            const checkGithub = await StudentInfo.findOne({
                where: { githubUsername: studentInfo.githubUsername },
            });
            if (!!checkGithub) {
                return {
                    message: 'Konto o takiej nazwie użytkownika Github jest juz zarejestrowane.',
                    isSuccess: false,
                };
            }
            const student = await this.updateStudentInfo(
                user.studentInfo.id,
                studentInfo,
                avatarUrl.message,
            );

            return {
                studentInfoId: student.id,
                isSuccess: true,
            };

        } catch (e) {
            return {
                message: 'Aktualizacja kursanta nie powiodła się',
                isSuccess: false,
            };
        }
    }

    async reservation({ studentId }: ReservationStudentDto, user: User): Promise<ReservationStudentResponse> {
        const { hr } = user;
        const student = await this.getStudent(studentId);
        const active = student.user.active;
        const { status } = student;

        const { maxReservedStudents } = hr;
        if (maxReservedStudents <= hr.studentsToInterview.length) {
            throw new BadRequestException('Nie możesz dodać więcej kursantów "Do Rozmowy.');
        }
        if (
            active === false ||
            status !== StudentStatus.ACCESSIBLE
        ) {
            throw new BadRequestException('Kursant jest niedostępny.');
        }

        const { affected } = await StudentInfo.update(
            {
                id: student.id,
                status: StudentStatus.ACCESSIBLE,
            },
            {
                status: StudentStatus.PENDING,
                hr,
                reservationTo: new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)),
            },
        );
        if (affected === 0) {
            return {
                message: 'Nie udało się dodać kursanta "Do rozmowy"',
                isSuccess: false,
            };
        } else {
            return {
                message: 'Dodano kursanta "Do rozmowy"',
                isSuccess: true,
            };
        }
    }

    async findOneCV(id: string): Promise<StudentInfoInterface> {
        const student = await StudentInfo.findOne({
            where: {
                id,
            },
            relations: ['bonusProjectUrls', 'portfolioUrls', 'projectUrls'],
        });
        if (!student) {
            throw new BadRequestException('Nie znaleziono użytkownika.');
        }
        return student;
    }

    async deactivation({ userId }: DeactivationStudentDto) {
        const { affected } = await User.update(
            { id: userId, role: UserRole.STUDENT, active: true },
            { active: false },
        );

        if (affected === 0) {
            return {
                isSuccess: false,
            };
        } else {
            return { isSuccess: true };
        }
    }

    async hired({ studentId }: HiredStudentDto): Promise<HiredStudentResponse> {
        const student = await this.getStudent(studentId);

        if (!student) {
            return {
                isSuccess: false,
                message: 'Nie znaleziono takiego kursanta.',
            };
        }

        if (student.status === StudentStatus.EMPLOYED) {
            return {
                isSuccess: false,
                message: 'Kursant nie jest w procesie o zatrudnienie.',
            }
        }

        const { affected } = await StudentInfo.update(
            { id: student.id, status: StudentStatus.PENDING },
            { status: StudentStatus.EMPLOYED },
        );

        if (affected === 0) {
            return { isSuccess: false };
        } else {
            const studentEmail = student.user.email;

            this.mailService.sendMail(
                process.env.ADMIN_EMAIL,
                'Zatrudniono kursanta!',
                `Kursant o e-mailu ${studentEmail} został pomyślnie zatrudniony.`,
            );

            this.mailService.sendMail(
                studentEmail,
                'Zostałeś zatrudniony!',
                `Gratulacje! Zostałeś zatrudniony w ${student.hr.company}`,
            );
        }
    }

    async disinterest({ studentId }: DisinterestStudentDto): Promise<DisinterestStudentResponse> {
        const student = await this.getStudent(studentId);

        if (!student) {
            return {
                isSuccess: false,
                message: 'Nie znaleziono takiego kursanta.',
            };
        }

        const { affected } = await StudentInfo.update(
            { id: student.id, status: StudentStatus.PENDING },
            { status: StudentStatus.ACCESSIBLE },
        );

        if (affected === 0) {
            return { isSuccess: false };
        } else {
            return { isSuccess: true };
        }
    }
}
