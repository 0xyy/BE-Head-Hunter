import { Module } from '@nestjs/common';
import { HrService } from './hr.service';
import { HrController } from './hr.controller';
import { StudentModule } from '../student/student.module';

@Module({
    imports: [StudentModule],
    controllers: [HrController],
    providers: [HrService],
    exports: [HrService],
})
export class HrModule {}
