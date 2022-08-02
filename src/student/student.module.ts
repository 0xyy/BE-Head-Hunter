import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { AdminStudentService } from './admin-student.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [StudentController],
    providers: [StudentService, AdminStudentService],
    exports: [StudentService, AdminStudentService],
})
export class StudentModule {}
