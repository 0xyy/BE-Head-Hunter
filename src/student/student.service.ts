import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Hr } from '../hr/entities/hr.entity';
import { User } from '../user/user.entity';
import { StudentInfo } from './entities/student-info.entity';
import { ReservationStudentDto } from './dto/reservation-student.dto';
import { DeactivationStudentDto } from './dto/deactivation-student.dto';
import { StudentDto } from './dto/student.dto';
import {
    ActiveStudentsResponse, StudentAvailabilityViewInterface,
    StudentInfoInterface,
    StudentInfoUpdateResponse,
    StudentStatus, StudentsToInterviewInterface, StudentsToInterviewResponse,
    UserRole,
} from '../types';

@Injectable()
export class StudentService {
    constructor(
        private httpService: HttpService,
    ) {
    }

    private async getUser(id: string): Promise<User | null> {
        return await User.findOne({
            where: { id },
            relations: ['studentInfo'],
        });
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

    async findGithubAvatar(name) {
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

    async reservation({ userId, hrId }: ReservationStudentDto) {
        const student = await this.getUser(userId);
        const { active, role } = student;
        const { status } = student.studentInfo;

        const hr = await Hr.findOne({
            where: { id: hrId },
            relations: ['studentsToInterview'],
        });

        const { maxReservedStudents } = hr;

        if (maxReservedStudents <= hr.studentsToInterview.length) {
            return {
                message: 'Nie możesz dodać więcej kursantów "Do Rozmowy.',
                isSuccess: false,
            };
        }

        if (!student) {
            return {
                message: 'Nie ma takiego studenta',
                isSuccess: false,
            };
        }

        if (!hr) {
            return {
                message: 'Nie ma takiego hr',
                isSuccess: false,
            };
        }

        if (
            active === false ||
            role !== UserRole.STUDENT ||
            status !== StudentStatus.ACCESSIBLE
        ) {
            return {
                message: 'Nie można dodać studenta.',
                isSuccess: false,
            };
        }

        const { affected } = await StudentInfo.update(
            { id: student.studentInfo.id, status: StudentStatus.ACCESSIBLE },
            { status: StudentStatus.PENDING, hr },
        );

        if (affected === 0) {
            return {
                isSuccess: false,
            };
        } else {
            return { isSuccess: true };
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
}
