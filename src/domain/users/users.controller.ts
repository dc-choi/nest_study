import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDTO } from './dto/SignupDTO';
import { User } from './entity/User';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() signupDTO: SignupDTO): Promise<User> {
        return await this.usersService.create(signupDTO);
    }
}
