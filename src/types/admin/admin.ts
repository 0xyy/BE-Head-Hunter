import { CreateHrDto } from '../../admin/dto/create-hr.dto';
import { UserInterface } from '../user';

export type CreateHrRequest = CreateHrDto;

export type CreateHrResponse =
  | { message: string; isSuccess: false }
  | { isSuccess: true };

export type InsertStudentResponse =
  | {
      countSuccess: number;
      isSuccess: true;
    }
  | {
      isSuccess: false;
      users: {
        user: UserInterface;
        errors: string[];
      }[];
      countSuccess: number;
      countFailed: number;
    };
