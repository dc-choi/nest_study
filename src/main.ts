import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.useGlobalPipes(); // 전역에서 pipe를 사용하는 방법
    await app.listen(3000);
}
bootstrap();
