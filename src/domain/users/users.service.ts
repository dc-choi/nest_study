import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/User';
import { Repository } from 'typeorm';
import { SignupDTO } from './dto/SignupDTO';
import { Builder } from 'builder-pattern';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async create(signupDTO: SignupDTO): Promise<User> {
        const { username, password } = signupDTO;

        const user = Builder<User>()
            .username(username)
            .password(password)
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
