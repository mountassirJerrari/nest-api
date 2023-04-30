import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  imports: [forwardRef(() => UserModule), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1000s' },
  })],
  controllers: [AuthController],
  providers: [AuthService , AuthGuard] ,
  exports: [AuthService , AuthGuard  ]
})
export class AuthModule { }
