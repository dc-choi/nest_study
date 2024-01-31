import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './global/configs/TypeOrmConfig';

import { BoardsModule } from './domain/boards/boards.module';
import { AppController } from './app.controller';
import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';

/**
 * @nestjs/typeorm
 * typeorm
 * pg
 *
 * postgres와 typeorm을 사용하기 위해서는 위 패키지 3가지를 설치해야한다.
 */
@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        BoardsModule,
        AuthModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: []
})
export class AppModule {}
