import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BoardStatus } from './BoardStatus';

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;
}
