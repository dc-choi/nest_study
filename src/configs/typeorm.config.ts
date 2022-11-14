import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from '../boards/board.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    // 엔티티를 한번에 불러와야 함.
    entities: [
        Board,
    ],
    // real Server에서는 무조건 false로 해야 함.
    synchronize: true,
};
