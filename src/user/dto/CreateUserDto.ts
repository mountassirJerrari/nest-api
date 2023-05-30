import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserdto {

    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    password: string;

}