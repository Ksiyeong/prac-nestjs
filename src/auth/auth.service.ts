import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) { }

    async existsByUsername(username: string): Promise<boolean> {
        return await this.userRepository.existsBy({ username });
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        // if (await this.existsByUsername(authCredentialsDto.username)) {
        //     throw new ConflictException('username already exists');
        // }

        const salt = await bcrypt.genSalt();
        authCredentialsDto.password = await bcrypt.hash(authCredentialsDto.password, salt);
        return this.userRepository.createUser(authCredentialsDto);
    }
}
