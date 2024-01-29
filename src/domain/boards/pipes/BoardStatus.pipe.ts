import {
    PipeTransform,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';

import { BoardStatus } from '../entity/BoardStatus';

/**
 * Pipe
 * 데이터 변환 및 데이터 검증을 할 수 있는 Provider입니다.
 *
 * 기본적인 Built-in Pipe
 * ValidationPipe : HTTP 요청의 데이터가 지정된 규칙을 준수하는지 확인합니다.
 * ParseIntPipe : 문자열을 정수로 변환합니다.
 * ParseFloatPipe : 문자열을 부동 소수점으로 변환합니다.
 * ParseBooleanPipe : 문자열을 불리언으로 변환합니다.
 * ParseArrayPipe : 문자열을 배열로 변환합니다.
 * ParseObjectPipe : 문자열을 객체로 변환합니다.
 * TrimPipe : 문자열의 공백을 제거합니다.
 * ReplacePipe : 문자열의 특정 문자열을 다른 문자열로 바꿉니다.
 * JsonPipe : JSON을 직렬화하거나 역직렬화합니다.
 * DatePipe : 날짜를 다른 형식으로 변환합니다.
 *
 * 이 파이프는 커스텀 Pipe로 따로 임의의 Pipe를 지정할 수 있다.
 */
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
    transform(value: string, metadata: ArgumentMetadata) {
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
