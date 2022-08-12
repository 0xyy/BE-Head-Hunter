import { BadRequestException, Injectable } from '@nestjs/common';
import { dataSource } from '../config/config-database';
import { HttpService } from '@nestjs/axios';
import { MailService } from '../mail/mail.service';
import { User } from '../user/user.entity';
import { StudentInfo } from './entities/student-info.entity';
import { ReservationStudentDto } from './dto/reservation-student.dto';
import { DeactivationStudentDto } from './dto/deactivation-student.dto';
import { HiredStudentDto } from './dto/hired-student.dto';
import { DisinterestStudentDto } from './dto/disinterest-student.dto';
import { StudentDto } from './dto/student.dto';
import {
    ActiveStudentsResponse, DisinterestStudentResponse,
    HiredStudentResponse, HrToStudentInterface,
    ReservationStudentResponse,
    StudentAvailabilityViewInterface,
    StudentInfoInterface,
    StudentInfoUpdateResponse,
    StudentStatus,
    StudentsToInterviewInterface,
    StudentsToInterviewResponse,
    UserRole,
} from '../types';
import { AllActiveStudentsDto } from './dto/all-active-students.dto';
import { HrToStudentEntity } from '../hr/entities/hr-to.student.entity';

@Injectable()
export class StudentService {
    constructor(
        private httpService: HttpService,
        private mailService: MailService,
    ) {
    }

    private async getStudent(id: string): Promise<StudentInfo> {
        try {
            return await StudentInfo.findOneOrFail({
                where: { id },
                relations: ['user', 'hrs'],
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

    private filterStudentsToInterview = (students: HrToStudentInterface[]): StudentsToInterviewInterface[] => {
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
            } = student.student;
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
                reservationTo: student.reservationTo,
            };
        });
    };

    async findAllActiveStudents(
        query: AllActiveStudentsDto,
    ): Promise<ActiveStudentsResponse> {
        try {
            const {
                pageSize,
                currentPage,
                courseCompletion,
                courseEngagment,
                projectDegree,
                teamProjectDegree,
                expectedTypeWork,
                expectedContractType,
                canTakeApprenticeship,
                monthsOfCommercialExp,
            } = query;
            const searchTerm = query.search.replace(/[^\w\d żółćśźęąń]/gi, '');
            const expectedSalaryMin = query.expectedSalaryMin.length === 0 ? '0' : query.expectedSalaryMin;
            const expectedSalaryMax = query.expectedSalaryMax.length === 0 ? '99999999' : query.expectedSalaryMax;

            const [students, count] = await dataSource
                .getRepository(StudentInfo)
                .createQueryBuilder()
                .where('status = :status AND courseCompletion >= :courseCompletion AND courseEngagment >= :courseEngagment AND projectDegree >= :projectDegree AND teamProjectDegree >= :teamProjectDegree AND (canTakeApprenticeship = :canTakeApprenticeship OR canTakeApprenticeship = "Tak") AND monthsOfCommercialExp >= :monthsOfCommercialExp AND (expectedSalary BETWEEN :expectedSalaryMin AND :expectedSalaryMax OR expectedSalary IS null)', {
                    status: StudentStatus.ACCESSIBLE,
                    courseCompletion,
                    courseEngagment,
                    projectDegree,
                    teamProjectDegree,
                    canTakeApprenticeship,
                    monthsOfCommercialExp,
                    expectedSalaryMin,
                    expectedSalaryMax,
                })
                .andWhere(!expectedContractType[0] ? 'status = :status' : '(expectedContractType IN (:expectedContractType) OR expectedContractType = "Bez znaczenia")', {
                    status: StudentStatus.ACCESSIBLE,
                    expectedContractType,
                })
                .andWhere((!expectedTypeWork[0]) ? 'status = :status' : '(expectedTypeWork IN (:expectedTypeWork) OR expectedTypeWork = "Bez znaczenia")', {
                    status: StudentStatus.ACCESSIBLE,
                    expectedTypeWork,
                })
                .andWhere(searchTerm.length === 0 ? 'status = :status' : '(MATCH(targetWorkCity) AGAINST (":searchTerm*" IN BOOLEAN MODE) OR MATCH(expectedTypeWork) AGAINST (":searchTerm*" IN BOOLEAN MODE) OR MATCH(expectedContractType) AGAINST (":searchTerm*" IN BOOLEAN MODE))', {
                    status: StudentStatus.ACCESSIBLE,
                    searchTerm,
                })
                .skip(pageSize * (currentPage - 1))
                .take(pageSize)
                .getManyAndCount();
            const pageCount = Math.ceil(count / pageSize);
            return {
                isSuccess: true,
                pageCount,
                students: this.filterAvailabilityStudent(students),
                studentsCount: count,
            };
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async findAllToInterview(
        query: AllActiveStudentsDto,
        user: User,
    ): Promise<StudentsToInterviewResponse> {
        try {
            const {
                pageSize,
                currentPage,
                courseCompletion,
                courseEngagment,
                projectDegree,
                teamProjectDegree,
                expectedTypeWork,
                expectedContractType,
                canTakeApprenticeship,
                monthsOfCommercialExp,
            } = query;
            const searchTerm = query.search.replace(/[^\w\d żółćśźęąń]/gi, '');
            const expectedSalaryMin = query.expectedSalaryMin.length === 0 ? '0' : query.expectedSalaryMin;
            const expectedSalaryMax = query.expectedSalaryMax.length === 0 ? '99999999' : query.expectedSalaryMax;

            const [students, count] = await dataSource
                .getRepository(HrToStudentEntity)
                .createQueryBuilder('hrToStudentEntity')
                .leftJoinAndSelect('hrToStudentEntity.student', 'studentInfo')
                .where('hrId = :hrId AND courseCompletion >= :courseCompletion AND courseEngagment >= :courseEngagment AND projectDegree >= :projectDegree AND teamProjectDegree >= :teamProjectDegree AND (canTakeApprenticeship = :canTakeApprenticeship OR canTakeApprenticeship = "Tak") AND monthsOfCommercialExp >= :monthsOfCommercialExp AND (expectedSalary BETWEEN :expectedSalaryMin AND :expectedSalaryMax OR expectedSalary IS null)', {
                    hrId: user.hr.id,
                    courseCompletion,
                    courseEngagment,
                    projectDegree,
                    teamProjectDegree,
                    canTakeApprenticeship,
                    monthsOfCommercialExp,
                    expectedSalaryMin,
                    expectedSalaryMax,
                })
                .andWhere(!expectedContractType[0] ? 'hrId = :hr' : '(expectedContractType IN (:expectedContractType) OR expectedContractType = "Bez znaczenia")', {
                    hr: user.hr.id,
                    expectedContractType,
                })
                .andWhere(!expectedTypeWork[0] ? 'hrId = :hr' : '(expectedTypeWork IN (:expectedTypeWork) OR expectedTypeWork = "Bez znaczenia" )', {
                    hr: user.hr.id,
                    expectedTypeWork,
                }).andWhere(searchTerm.length === 0 ? 'hrId = :hr ' : '(MATCH(targetWorkCity) AGAINST (":searchTerm*" IN BOOLEAN MODE) OR MATCH(expectedTypeWork) AGAINST (":searchTerm*" IN BOOLEAN MODE) OR MATCH(expectedContractType) AGAINST (":searchTerm*" IN BOOLEAN MODE)OR MATCH(firstName) AGAINST (":searchTerm*" IN BOOLEAN MODE) OR MATCH(lastName) AGAINST (":searchTerm*" IN BOOLEAN MODE))', {
                    hr: user.hr.id,
                    searchTerm,
                })
                .skip(pageSize * (currentPage - 1))
                .take(pageSize)
                .getManyAndCount();

            const pageCount = Math.ceil(count / pageSize);
            return {
                isSuccess: true,
                pageCount,
                studentsCount: count,
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

    async update(user, studentInfo: StudentDto): Promise<StudentInfoUpdateResponse> {
        try {
            const avatarUrl = await this.findGithubAvatar(studentInfo.githubUsername);
            if (!avatarUrl.isSuccess) {
                return {
                    message: 'Nie znaleziono konta github.',
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
            if (!!checkGithub && checkGithub.id !== user.studentInfo.id) {
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
        if (hr.studentsToInterview.some(ele => ele.studentId === studentId)) {
            throw new BadRequestException('Student już jest dodany w "Do Rozmowy".');
        }
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
        try {
            const hrToStudent = new HrToStudentEntity();
            hrToStudent.hr = hr;
            hrToStudent.student = student;
            hrToStudent.reservationTo = new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000));
            await hrToStudent.save();
            return {
                message: 'Dodano kursanta "Do rozmowy"',
                isSuccess: true,
            };
        } catch (e) {
            throw new BadRequestException('Nie udało się dodać kursanta "Do rozmowy"');

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
            };
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

            // this.mailService.sendMail(
            //     studentEmail,
            //     'Zostałeś zatrudniony!',
            //     `Gratulacje! Zostałeś zatrudniony w ${student.hr.company}`,
            // );
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
