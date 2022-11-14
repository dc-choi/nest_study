import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsRepository } from './boards.repository';

import { Board } from './board.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Board])],
    providers: [BoardsService, BoardsRepository],
    controllers: [BoardsController],
})
export class BoardsModule {}
