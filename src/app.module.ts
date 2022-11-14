import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeORMConfig } from './configs/typeorm.config';

import { BoardsModule } from './boards/boards.module';
import { AppController } from './app.controller';

@Module({
    imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
