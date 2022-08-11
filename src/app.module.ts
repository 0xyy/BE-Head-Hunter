import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HrModule } from './hr/hr.module';
import { DatabaseModule } from './database/database.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        AdminModule,
        UserModule,
        HrModule,
        StudentModule,
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 100,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
