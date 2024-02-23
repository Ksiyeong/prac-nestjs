import { IsString, Length, Matches, MinLength, max, min } from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @Length(4, 20)
    username: string;

    @IsString()
    @Length(4, 20)
    @Matches(/^[a-zA-Z0-9]*$/, { message: 'password only accepts English and number' })
    password: string;

}