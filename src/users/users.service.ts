import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
constructor(
@InjectRepository(Users)
private usersRepository:Repository<Users>,
){}




async findOne(email: string): Promise<Users> {

  return await this.usersRepository.findOne({where:{email}})
}

async userSignUp(
  username:string,
  email:string,
  password:string
){
const isAdmin = false

const initUser =  this.usersRepository.create({
  username,email,password,isAdmin
})

const createdUser = await this.usersRepository.save(initUser)

return createdUser

}



}
