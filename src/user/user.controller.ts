import {
    Body,
    Controller,
    Inject,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from './user.entity';
import {
    ActivateUserRequest,
    ActivateUserResponse,
    EditPasswordRequest,
    EditPasswordResponse,
    RecoverPasswordRequest,
    RecoverPasswordResponse,
} from '../types';

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ) {}

    @Patch(`/activate`)
    activeUser(
        @Body() active: ActivateUserRequest,
    ): Promise<ActivateUserResponse> {
        return this.userService.activate(active);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(`/edit`)
    editPassword(
        @UserObj() user: User,
        @Body() password: EditPasswordRequest,
    ): Promise<EditPasswordResponse> {
        return this.userService.editPassword(password, user);
    }

    @Post(`/recover`)
    recoverPassword(
        @Body() recover: RecoverPasswordRequest,
    ): Promise<RecoverPasswordResponse> {
        return this.userService.recover(recover);
    }
}
