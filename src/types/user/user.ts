import { ActivateUserDto } from '../../user/dto/activate-user.dto';
import { EditPasswordDto } from '../../user/dto/edit-password.dto';
import { RecoverDto } from '../../user/dto/recover-password.dto';

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
  COURSANT,
  HR,
}

export type ActivateUserRequest = ActivateUserDto;
export type EditPasswordRequest = EditPasswordDto;
export type RecoverPasswordRequest = RecoverDto;
