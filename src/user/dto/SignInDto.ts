import { IsEmail, IsNotEmpty } from "class-validator";

export class signInDto {

    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;

}