import {
    PipeTransform,
    // ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';

import { BoardStatus } from '../board.model';

export class BoardStatusPipe implements PipeTransform {
    readonly statusOption: BoardStatus[] = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

    // transform(value: any, metadata: ArgumentMetadata) {
    //   console.log(value);
    //   // 처리가된 인자의 값
    //   console.log(metadata);
    //   // 인자에 대한 메타데이터를 포함한 객체

    //   return value;
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(value: any) {
        value = value.toUpperCase();

        if (this.isStatusVaild(value)) {
            throw new BadRequestException(`400 Bad Request: value is wrong!! => ${value}`);
        }

        return value;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private isStatusVaild(status: any) {
        const index = this.statusOption.indexOf(status);

        return index === -1;
    }
}
