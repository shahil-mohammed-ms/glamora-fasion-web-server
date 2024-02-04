import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  
})
export class UsersModule {}
