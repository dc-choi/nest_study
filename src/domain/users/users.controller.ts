import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupRequest } from './dto/SignupDTOs';
import { User } from './entity/User';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() signupRequst: SignupRequest): Promise<User> {
        return await this.usersService.create(signupRequst);
    }
}
