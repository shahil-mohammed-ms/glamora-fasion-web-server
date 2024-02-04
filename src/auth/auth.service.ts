import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
constructor(private usersService: UsersService,
  private jwtService: JwtService
  ){}

async validateUser(email: string, password: string): Promise<any> {

  const user = await this.usersService.findOne(email);
  const passcheck = await bcrypt.compare(password, user.password);
  if (passcheck) {
    const { password, ...result } = user;
    return result;
  }
  return null;
}

async login(user: any) {
  const payload = { username: user.username, sub: user.userId };
  return {
    access_token: this.jwtService.sign(payload),
  };
}

async  hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Number of salt rounds to use in the hashing process
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

}
