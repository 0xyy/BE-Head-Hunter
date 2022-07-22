import {HrCoursantDto} from "./hr-coursant.dto";

export class ResponseHrCoursantsDto {
    currentPage: number;
    pageSize: number;
    pageCount: number;
    coursants: HrCoursantDto[];
}