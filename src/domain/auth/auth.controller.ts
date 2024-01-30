import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './dto/LoginDTOs';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/utils/UserDecorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
        return await this.authService.login(loginRequest);
    }

    @Post('test')
    @UseGuards(AuthGuard())
    test(@GetUser() user) {
        console.log(user);
    }
}
