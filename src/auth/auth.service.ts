import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }

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

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            // 유저 토큰 생성
            const payload = {
                id: user.id,
                username: user.username
            };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
