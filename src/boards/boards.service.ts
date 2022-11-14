import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { CreateBoardDTO } from './dto/CreateBoard.dto';
import { BoardStatus } from './board.model';
import { Board } from './board.entity';

import { BoardsRepository } from './boards.repository';

@Injectable()
export class BoardsService {
    constructor(private boardsRepository: BoardsRepository) {}

    async getBoards(): Promise<Board[]> {
        return await this.boardsRepository.getBoards();
    }

    // createBoard(createBoardDTO: CreateBoardDTO): Board {
    //     const { title, description } = createBoardDTO;

    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     };

    //     this.boards.push(board);

    //     return board;
    // }

    async getBoard(id: number): Promise<Board> {
        const foundBoards = await this.boardsRepository.getBoard(id);

        if (!foundBoards) throw new NotFoundException(`404 Not Found: id is wrong!! => ${id}`);

        return foundBoards;
    }

    // deleteBoard(id: string): void {
    //     const foundBoards = this.getBoard(id);
    //     this.boards = this.boards.filter((board) => board.id !== foundBoards.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoard(id);
    //     board.status = status;
    //     return board;
    // }
}
