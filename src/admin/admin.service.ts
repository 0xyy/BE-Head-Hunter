import { Injectable } from '@nestjs/common';
import {EditPasswordDto} from "./dto/editPasswordDto";
import {RecoverPasswordDto} from "./dto/recoverPasswordDto";

@Injectable()
export class AdminService {
    async editPassword(password: EditPasswordDto) {
        return Promise.resolve(undefined);
    }

    async recover(recover: RecoverPasswordDto) {
        return Promise.resolve(undefined);
    }

}
