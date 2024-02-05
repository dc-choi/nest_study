import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Builder } from 'builder-pattern';
import { mock, when } from '@johanblumenberg/ts-mockito';
import { BoardsService } from 'src/domain/boards/boards.service';
import { Board } from 'src/domain/boards/entity/Board';
import { BoardStatus } from 'src/domain/boards/utils/BoardEnums';

describe(`board unit test`, async () => {
    describe(`run test`, async () => {
        it(`test`, async () => {
            // given
            const service = mock(BoardsService);
            const id = 1;
            const data = Builder<Board>()
                .id(id)
                .title('title')
                .status(BoardStatus.PUBLIC)
                .build();
            when(await service.get(id)).thenReturn(data);
            // when
            const board = await service.get(id);
            // then
            expect(board).to.be.a.instanceOf(Board);
        });
    });
});
