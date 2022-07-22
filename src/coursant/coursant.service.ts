import { Injectable } from '@nestjs/common';
import {ResponseHrCoursantsDto, ResponseHrCoursantsForInterviewDto} from '../types';
import {CoursantDto} from "../types";
import {CvCoursantDto} from "../types";

@Injectable()
export class CoursantService {

  findAll(): ResponseHrCoursantsDto {
    return new ResponseHrCoursantsDto();
  }

  findOne(id: string): CoursantDto {
    return new CoursantDto();
  }

  update(id: string, coursantDto: CoursantDto) {
    return `This action updates a #${id} coursant`;
  }

  reservation(id: string, hrid: string){
    return `This action reservation a #${id} coursant by #${hrid} hr`;
  }

  findOneCV(id: string): CvCoursantDto {
    return new CvCoursantDto();
  }

  findAllForInterview(hrId: string): ResponseHrCoursantsForInterviewDto {
        return new ResponseHrCoursantsForInterviewDto();
  }
}
