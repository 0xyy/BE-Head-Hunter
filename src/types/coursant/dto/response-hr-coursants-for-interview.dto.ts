import {HrCoursantForInterviewDto} from "./hr-coursant-for-interview.dto";

export  class ResponseHrCoursantsForInterviewDto{
    currentPage: number;
    pageSize: number;
    pageCount: number;
    coursants: HrCoursantForInterviewDto[];
}