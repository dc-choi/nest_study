import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { LoginResponse } from "src/domain/auth/dto/LoginDTOs";
import { User } from "src/domain/users/entity/User";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            secretOrKey: 'Q!W@E#R$T%Y^',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: LoginResponse) {
        const { username } = payload;
        const saved = await this.userRepository.findOne({
            where: {
                username
            }
        });

        if (!saved) throw new UnauthorizedException('invalid jwt');

        return payload;
    }
}
