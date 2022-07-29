import { CreateHrDto } from '../../admin/dto/create-hr.dto';

export type CreateHrRequest = CreateHrDto;

export type CreateHrResponse =
  | { message: string; isSuccess: false }
  | { isSuccess: true };
