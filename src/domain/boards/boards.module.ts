import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

import { Board } from './entity/Board';
import { AuthModule } from '../auth/auth.module';

/**
 * nest g module boards
 * 위 명령어로 자동 생성할 수 있다.
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([Board]),
        AuthModule
    ],
    providers: [BoardsService],
    controllers: [BoardsController],
})
export class BoardsModule {}
