import {HrCoursantDto} from "./hr-coursant.dto";

export class HrCoursantForInterviewDto extends HrCoursantDto{
    avatar: string;
    fullName: string;
    reservationTo: Date;
}