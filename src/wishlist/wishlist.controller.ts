import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Wishlists } from './wishlist.entity';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async createWishlist(@Body() wishlistData): Promise<any> {
    return this.wishlistService.createWishlist(wishlistData);
  }

  @Get()
  async getAllWishlists(): Promise<any> {
    return this.wishlistService.getAllWishlists();
  }

  @Delete(':id')
  async deleteWishlist(@Param('id') wishlistId: string) {
    await this.wishlistService.deleteWishlist(wishlistId);
    return { message: 'Wishlist deleted successfully' };
  }

}
