import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) { }

    async existsByUsername(username: string): Promise<boolean> {
        return await this.userRepository.existsBy({ username });
    }

    /*async*/ signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        // if (await this.existsByUsername(authCredentialsDto.username)) {
        //     throw new ConflictException('username already exists');
        // }
        return this.userRepository.createUser(authCredentialsDto);
    }
}
