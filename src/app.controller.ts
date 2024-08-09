import { Controller, Get } from '@nestjs/common';
import BigDecimal from 'bignumber.js';
import Decimal from 'decimal.js';

@Controller()
export class AppController {
    @Get()
    hello() {
        const num1 = 10000.1;
        const num2 = 0.2;
        const myNumber = num1 + num2;

        // 연산 오류가 발생하는 경우 예외를 발생 시켜 디버깅 할 수 있는 옵션
        // BigDecimal.DEBUG = true;
        // new BigDecimal(823456789123456.3);

        let big = new BigDecimal(num1);
        big = big.plus(num2);

        let decimal = new Decimal(num1);
        decimal = decimal.plus(num2);

        return { myNumber, big, decimal };
    }
}
