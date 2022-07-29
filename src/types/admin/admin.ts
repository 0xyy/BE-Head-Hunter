import { CreateHrDto } from '../../admin/dto/create-hr.dto';
import { UserInterface } from '../user';

export type CreateHrRequest = CreateHrDto;

export type CreateHrResponse =
  | { message: string; isSuccess: false }
  | { isSuccess: true };

export type InsertStudentResponse =
  | {
      isSuccess: true;
    }
  | {
      user: UserInterface;
      errors: string[];
    }[];
