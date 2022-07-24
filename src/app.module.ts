import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HrModule } from './hr/hr.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, HrModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
