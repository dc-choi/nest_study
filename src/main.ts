import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

/**
 * Nest.js 라이프사이클
 *
 * 1. middleware
 *
 * 2. guard
 * 인증 미들웨어.
 * 지정된 경로로 통과할 수 있는 사람과 허용되지 않는 사람을 서버에 알려줌.
 *
 * 3. interceptor (before)
 * 응답 매핑 및 캐시 관리, 요청 로깅과 같은 전후 미들웨어.
 * 각 요청 전후에 이를 실행하는 기능.
 *
 * 4. pipe
 * 요청 유효성 검사 및 페이로드 변환.
 * 데이터를 예상한 대로 직렬화함.
 *
 * 5. controller
 *
 * 6. service
 *
 * 7. interceptor (after)
 *
 * 8. filter
 * 오류 처리 미들웨어.
 * 특정 오류 처리기를 사용할 경로와 각 경로 주변의 복장성을 관리
 */
async function bootstrap() {
    const serverConfig = config.get('server');
    const app = await NestFactory.create(AppModule);
    const port = serverConfig.port;

    /**
     * log: 중요한 정보의 범용 로깅
     * warn: 중요하지 않은 문제
     * error: 치명적인 문제
     * debug: 오류 발생시 로직을 디버그 하는데 도움이 되는 유용한 정보 (개발자)
     * verbose: 응용 프로그램의 동작에 대한 통찰력은 제공하는 정보 (운영자)
     */
    const logger = new Logger('main', {
        timestamp: true
    });
    // app.useGlobalPipes(); // 전역에서 pipe를 사용하는 방법
    app.useLogger(logger);
    await app.listen(port);
    logger.log(`application running on port ${port}`);
}
bootstrap();
