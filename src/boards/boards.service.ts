import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(private readonly boardRepository: BoardRepository) { }

    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });

        const boards = await query.getMany();

        return boards;
        // return await this.boardRepository.find();
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board> {
        const board = await this.boardRepository.findOneBy({ id });
        if (!board) throw new NotFoundException('요청하신 데이터를 찾을 수 없습니다.');
        return board;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        if (!result.affected) throw new NotFoundException('요청하신 데이터를 찾을 수 없습니다.');
        return;
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        return await this.boardRepository.save(board);
    }
}
