import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursantService } from './coursant.service';
import { CreateCoursantDto } from '../types';
import { UpdateCoursantDto } from '../types';
import {ResponseReviewCoursantsDto} from "../types";
import {CoursantDto} from "../types";

@Controller('coursant')
export class CoursantController {
  constructor(private readonly coursantService: CoursantService) {}

  @Post()
  create(@Body() createCoursantDto: CreateCoursantDto) {
    return this.coursantService.create(createCoursantDto);
  }

  @Get()
  findAll(@Param('currentPage') currentPage: number,
          @Param('pageSize') pageSize: number,
          @Param('pageCount') pageCount: number): ResponseReviewCoursantsDto {

    return this.coursantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): CoursantDto{
    return this.coursantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoursantDto: UpdateCoursantDto) {
    return this.coursantService.update(id, updateCoursantDto);
  }

  @Patch('reservation/:id')
  reservation(@Param('id') id: string, @Param('hrid') hrid: string,) {
    return this.coursantService.reservation(id, hrid);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursantService.remove(id);
  }
}
