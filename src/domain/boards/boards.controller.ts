import { Controller, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { BoardStatus } from './entity/BoardStatus';
import { CreateBoardDTO } from './dto/CreateBoardDTO';
import { Board } from './entity/Board';
import { BoardStatusPipe } from './pipes/BoardStatus.pipe';

import { BoardsService } from './boards.service';

/**
 * nest g controller boards --no-spec
 * 위 명령어로 자동 생성할 수 있다.
 * --no-spec는 test code를 자동 생성하지 않는다는 의미다.
 */
@Controller('boards')
export class BoardsController {
    // 이 코드는 기존 스타일입니다.
    // boardsService: BoardsService;

    // constructor(boardsService: BoardsService) {
    //   this.boardsService = boardsService;
    // }

    // 1. TS에서는 선언한 값만 객체의 프로퍼티로 사용 가능하기 때문에 위에 boardsService: BoardsService로 선언해줍니다.
    // 2. boardService 파라미터에 BoardService 객체를 타입으로 지정해줍니다.
    // 3. 이 boardService 파라미터를 BoardsController 클래스 안에서 사용하기 위해서 this.boardsService 프로퍼티에 boardsService 파라미터를 할당해줍니다.

    // 이 코드는 TypeScript의 접근 제한자를 사용해서 만들었습니다.
    // 접근 제한자를 파라미터에 사용하게 되면 암묵적으로 위 과정처럼 사용한다고 함.
    constructor(private boardsService: BoardsService) {}

    @Get()
    async list(): Promise<Board[]> {
        return await this.boardsService.list();
    }

    @Post()
    @UsePipes(ValidationPipe) // 핸들러 레벨에서 Pipe를 사용하는 방법
    async createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<Board> {
        return await this.boardsService.create(createBoardDTO);
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<Board> {
        return await this.boardsService.get(id);
    }

    @Delete(':id')
    async deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<Board> { // 매개변수 레벨에서 Pipe를 사용하는 방법
        return await this.boardsService.deleteBoard(id);
    }

    @Put(':id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusPipe) status: BoardStatus
    ): Promise<Board> {
        return this.boardsService.updateStatus(id, status);
    }
}
