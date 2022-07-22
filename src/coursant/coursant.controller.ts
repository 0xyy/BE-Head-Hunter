import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { CoursantService } from './coursant.service';
import {ResponseHrCoursantsDto, ResponseHrCoursantsForInterviewDto} from '../types';
import {CoursantDto} from "../types";
import {CvCoursantDto} from "../types";

@Controller('coursant')
export class CoursantController {
  constructor(private readonly coursantService: CoursantService) {}


  @Get()
  findAll(@Param('currentPage') currentPage: number,
          @Param('pageSize') pageSize: number,
          @Param('pageCount') pageCount: number): ResponseHrCoursantsDto {

    return this.coursantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): CoursantDto{
    return this.coursantService.findOne(id);
  }

  @Get('interview/:hrId')
  findAllForInterview(@Param('hrId') hrId: string): ResponseHrCoursantsForInterviewDto{
    return this.coursantService.findAllForInterview(hrId);
  }

  @Get('cv/:id')
  findOneCV(@Param('id') id: string): CvCoursantDto{
    return this.coursantService.findOneCV(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() coursantDto: CoursantDto) {
    return this.coursantService.update(id, coursantDto);
  }

  @Patch('reservation/:id/:hrid')
  reservation(@Param('id') id: string, @Param('hrid') hrid: string,) {
    return this.coursantService.reservation(id, hrid);
  }

}
