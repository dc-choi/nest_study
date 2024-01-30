import { IsNotEmpty } from 'class-validator';

export class CreateBoardRequest {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}
