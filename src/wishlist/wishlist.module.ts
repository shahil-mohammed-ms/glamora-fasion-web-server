import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { Wishlists } from './wishlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Wishlists])
    ],
  providers: [WishlistService],
  controllers: [WishlistController]
})
export class WishlistModule {}
