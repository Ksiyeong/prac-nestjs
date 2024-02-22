import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './pipes/board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(private readonly boardRepository: BoardRepository) { }

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });

        await this.boardRepository.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        const board = await this.boardRepository.findOneBy({ id });
        if (!board) throw new NotFoundException('요청하신 데이터를 찾을 수 없습니다.');
        return board;
    }

    // deleteBoard(id: string): void {
    //     const foundBoard = this.getBoardById(id);
    //     this.boards = this.boards.filter(board => board.id !== foundBoard.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
