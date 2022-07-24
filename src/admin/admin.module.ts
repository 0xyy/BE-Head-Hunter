import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from '../user/user.module';
import { HrModule } from '../hr/hr.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [UserModule, HrModule, StudentModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
