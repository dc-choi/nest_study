import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from '../../domain/boards/entity/Board';
import { User } from '../../domain/users/entity/User';
import config from 'config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { type, host, port, username, password, database, synchronize }: any = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type,
    host,
    port,
    username,
    password,
    database,
    // 전역에서 엔티티를 불러와야 모든 곳에서 사용할 수 있음.
    entities: [
        Board, User
    ],
    // real Server에서는 무조건 false로 해야 함.
    synchronize,
};
