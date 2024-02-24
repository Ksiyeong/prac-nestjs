import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
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

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            return 'login success';
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
