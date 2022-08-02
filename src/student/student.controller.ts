import { Controller, Body, Patch } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import { DeactivationStudentDto } from './dto/deactivation-student.dto';
import { ReservationStudentDto } from './dto/reservation-student.dto';

@Controller('student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService,
    ) {}

    @Patch('update')
    update(
        @Body() StudentDto: StudentDto,
    ) {
        return this.studentService.update(StudentDto);
    }

    @Patch('reservation')
    reservation(
        @Body() ReservationStudentDto: ReservationStudentDto,
    ) {
        return this.studentService.reservation(ReservationStudentDto);
    }

    @Patch('deactivation')
    deactivation(
        @Body() DeactivationStudentDto: DeactivationStudentDto,
    ) {
        return this.studentService.deactivation(DeactivationStudentDto);
    }
}
