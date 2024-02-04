import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req ) {
    return this.authService.login(req.user)
    //return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
 
  @Post('signup')
  async signup(@Body() body:any){
    const {username,email,password} = body
  const alreadyExisting = await this.usersService.findOne(email)
 
  if(alreadyExisting){
     return 'existing user try another email'
  }
const hashedpassword = await this.authService.hashPassword(password)

const createdUser = await this.usersService.userSignUp(username,email,hashedpassword)

  return createdUser

  }

}
