import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CoursantModule } from './coursant/coursant.module';


@Module({
  imports: [DatabaseModule, CoursantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
