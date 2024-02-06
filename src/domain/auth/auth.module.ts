import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/User';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/JwtStrategy';
import config from 'config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { secret, expire }: any = config.get('token');

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            secret: secret, // JWT를 생성할 때 이용하는 암호화 String
            signOptions: {
                expiresIn: expire // 유효시간: 1시간동안 유효
            }
        }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
