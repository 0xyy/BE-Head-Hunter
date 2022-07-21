import {ReviewCoursantDto} from "./review-coursant.dto";

export class ResponseReviewCoursantsDto {
    currentPage: number;
    pageSize: number;
    pageCount: number;
    coursants: ReviewCoursantDto[];
}