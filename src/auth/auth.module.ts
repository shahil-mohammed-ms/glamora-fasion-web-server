import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Users } from 'src/users/user.entity';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([Users]),
  PassportModule,
  JwtModule.register({
    secret: 'jwtsecret',//put in .env
    signOptions: { expiresIn: '60s' },
  }),

],
  providers: [AuthService,UsersService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
