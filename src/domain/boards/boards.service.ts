import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { CreateBoardDTO } from './dto/CreateBoardDTO';
import { BoardStatus } from './entity/BoardStatus';
import { Board } from './entity/Board';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Builder } from 'builder-pattern';

/**
 * provider
 * Nest의 제일 기본이 되는 개념이다.
 * 대부분의 Nest 클래스는 Service, Repository, Factory, Helper등 프로바이더로 취급될 수 있음.
 *
 * 가장 큰 특징은 종속성을 주입할 수 있다는 점이다.
 * 객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 연결하는 기능은 대부분 런타임에 위임됨
 *
 * nest g service boards --no-spec
 * 위 명령어로 자동 생성할 수 있다.
 * --no-spec는 test code를 자동 생성하지 않는다는 의미다.
 */
@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardsRepository: Repository<Board>
    ) {}

    async list(): Promise<Board[]> {
        // const queryRunner = this.boardsRepository.queryRunner;
        // await queryRunner.startTransaction();
        return await this.boardsRepository.find();
    }

    // 쿼리빌더를 사용해서 값을 가져옴.
    // async getBoards(): Promise<Board[]> {
    //     return await this.boardRepository
    //     .createQueryBuilder()
    //     .where('Board.id = :id', { id: 1 }).getMany();
    // }

    async create(createBoardDTO: CreateBoardDTO): Promise<Board> {
        const { title, description } = createBoardDTO;

        const board: Board = Builder<Board>()
            .title(title)
            .description(description)
            .status(BoardStatus.PUBLIC)
            .build();

        return await this.boardsRepository.save(board);
    }

    async get(id: number): Promise<Board> {
        const saved = await this.boardsRepository.findOneBy({ id });

        if (!saved) throw new NotFoundException(`404 Not Found: id is wrong!! => ${id}`);

        return saved;
    }

    async deleteBoard(id: number): Promise<Board> {
        const saved = await this.get(id);

        this.boardsRepository.delete(id);

        return saved;
    }

    async updateStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.get(id);
        board.status = status;

        this.boardsRepository.save(board);

        return board;
    }
}
