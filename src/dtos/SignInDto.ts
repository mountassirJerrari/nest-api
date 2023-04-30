import { IsEmail, IsNotEmpty } from "class-validator";

export class signInDto {

    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    password: string;

}