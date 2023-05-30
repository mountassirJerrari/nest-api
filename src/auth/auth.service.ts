import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CreateUserdto } from '../user/dto/CreateUserDto';

@Injectable()
export class AuthService {
   
    constructor(private userService: UserService,
        private jwtService: JwtService) {}

    async signIn(username: string, pass: string): Promise<any> {
      const user = await this.userService.findOne(username);
      if (!user) {
          throw new HttpException('user not found consider Registering',HttpStatus.BAD_REQUEST);
         return ; 
      }
      if (!(await bcrypt.compare(pass, user.password))) {
        throw new UnauthorizedException();
      }
      
      const payload = { username: user.username, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  register(data: CreateUserdto) {
   return  this.userService.create(data);
  }
}
