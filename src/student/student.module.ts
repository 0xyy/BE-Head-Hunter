import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { AdminStudentService } from './admin-student.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, AdminStudentService],
})
export class StudentModule {}
