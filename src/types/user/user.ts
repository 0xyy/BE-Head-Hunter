import { ActivateUserDto } from '../../user/dto/activate-user.dto';
import { EditPasswordDto } from '../../user/dto/edit-password.dto';
import { RecoverPasswordDto } from '../../user/dto/recover-password.dto';

export interface UserInterface {
  id: string;
  email: string;
  pwdHash: string;
  currentTokenId: string | null;
  activeTokenId: string | null;
  active: boolean;
  role: UserRole;
}

export type EditPasswordResponse = {
  isSuccess: boolean;
};
export type ActivateUserResponse = {
  isSuccess: boolean;
};
export type RecoverPasswordResponse = {
  isSuccess: boolean;
};
export enum UserRole {
  ADMIN,
  STUDENT,
  HR,
}

export type ActivateUserRequest = ActivateUserDto;
export type EditPasswordRequest = EditPasswordDto;
export type RecoverPasswordRequest = RecoverPasswordDto;
