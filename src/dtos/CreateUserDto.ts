import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserdto {

    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    password: string;

}