import { Injectable } from '@nestjs/common';
import { CreateCoursantDto } from '../types';
import { UpdateCoursantDto } from '../types';
import {CoursantDto} from "../types";
import {ResponseReviewCoursantsDto} from "../types";

@Injectable()
export class CoursantService {
  create(createCoursantDto: CreateCoursantDto) {
    return 'This action adds a new coursant';
  }

  findAll(): ResponseReviewCoursantsDto {
    return new ResponseReviewCoursantsDto();
  }

  findOne(id: string): CoursantDto {
    return new CoursantDto();
  }

  update(id: string, updateCoursantDto: UpdateCoursantDto) {
    return `This action updates a #${id} coursant`;
  }

  remove(id: string) {
    return `This action remove a #${id} coursant`;
  }

  reservation(id: string, hrid: string){
    return `This action reservation a #${id} coursant by #${hrid} hr`;
  }
}
