import { Controller, Get, Param, Post } from '@nestjs/common';
import { HrService } from './hr.service';

@Controller('/hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Get('/students/available')
  showAvailableStudents(): Promise<void> {
    return this.hrService.getAvailableStudents();
  }

  @Get('/students/to-talk')
  showStudentsToTalk(): Promise<void> {
    return this.hrService.getStudentsToTalk();
  }

  @Get('/student/:id')
  showSingleStudent(@Param('id') id: string): Promise<void> {
    // pobranie pojedynczego kursanta, użycie innego serwisu
    return;
  }
}
