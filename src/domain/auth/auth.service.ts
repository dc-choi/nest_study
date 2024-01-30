import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entity/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { LoginRequest, LoginResponse } from './dto/LoginDTOs';
import { JwtService } from '@nestjs/jwt';
import { Builder } from 'builder-pattern';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const { username, password } = loginRequest;

        const saved = await this.usersRepository.findOne({
            where: {
                username
            }
        });

        const compare = await bcrypt.compare(password, saved.password);

        if (!(saved && compare)) {
            throw new UnauthorizedException('login failed');
        }

        const accessToken = this.jwtService.sign({ username });

        return Builder<LoginResponse>()
            .username(username)
            .accessToken(accessToken)
            .build();
    }
}
