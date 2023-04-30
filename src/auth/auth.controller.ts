import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { signInDto } from 'src/dtos/SignInDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: signInDto) {
        return this.authService.signIn(signInDto.name, signInDto.password);
    }

}
