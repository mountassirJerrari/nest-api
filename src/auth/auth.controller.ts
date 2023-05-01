import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards ,Request } from '@nestjs/common';
import { Request as _Request, Response } from 'express';
import { CreateUserdto } from 'src/dtos/CreateUserDto';
import { signInDto } from 'src/dtos/SignInDto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: signInDto , @Res() res  : Response ,@Req() req  : _Request) {
        let token    =await this.authService.signIn(signInDto.name, signInDto.password);
        console.log(req.headers.authorization);
        
        res.setHeader('Authorization', `Bearer ${token.access_token}`);
        res.send( token );
        return 
    }
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() data: CreateUserdto) {
     let {password , ...result}= await this.authService.register(data) ;
      return result ;
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

}
