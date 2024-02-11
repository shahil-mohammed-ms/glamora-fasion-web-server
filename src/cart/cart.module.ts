import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from './cart.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Carts])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
