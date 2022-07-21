import { Module } from '@nestjs/common';
import { CoursantService } from './coursant.service';
import { CoursantController } from './coursant.controller';

@Module({
  controllers: [CoursantController],
  providers: [CoursantService]
})
export class CoursantModule {}
