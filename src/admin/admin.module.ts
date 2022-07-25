import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from '../user/user.module';
import { HrModule } from '../hr/hr.module';
import { StudentModule } from '../student/student.module';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [UserModule, HrModule, StudentModule, AuthModule, MailModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
