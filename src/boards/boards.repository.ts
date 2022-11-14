import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Board } from './board.entity';

@Injectable()
export class BoardsRepository {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>
    ) {}

    async getBoards(): Promise<Board[]> {
        // const queryRunner = this.boardRepository.queryRunner;
        // await queryRunner.startTransaction();
        return await this.boardRepository.find();
    }

    // 쿼리빌더를 사용해서 값을 가져옴.
    // async getBoards(): Promise<Board[]> {
    //     return await this.boardRepository
    //     .createQueryBuilder()
    //     .where('Board.id = :id', { id: 1 }).getMany();
    // }

    async getBoard(id: number): Promise<Board> {
        return await this.boardRepository.findOneBy({ id });
    }
}
