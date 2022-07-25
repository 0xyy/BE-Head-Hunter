import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HrModule } from './hr/hr.module';
import { DatabaseModule } from './database/database.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, UserModule, HrModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
