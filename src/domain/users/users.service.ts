import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/User';
import { Repository } from 'typeorm';
import { SignupRequest } from './dto/SignupDTOs';
import { Builder } from 'builder-pattern';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async create(signupRequest: SignupRequest): Promise<User> {
        const { username, password } = signupRequest;
        const salt = await bcrypt.genSalt();
        const hashedPasssword = await bcrypt.hash(password, salt);

        const user = Builder<User>()
            .username(username)
            .password(hashedPasssword)
            .build();

        let saved: User;
        try {
            saved = await this.usersRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('user is already signup')
            } else {
                throw new InternalServerErrorException(error);
            }
        }

        return saved;
    }
}
