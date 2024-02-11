import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(@Body() cartData: any): Promise<any> {
    return this.cartService.createCart(cartData);
  } 

  @Get(':userId')
  async getCartsByUserId(@Param('userId') userId: string) {
    return this.cartService.getAllCartsByUserId(userId);
  }

  @Delete(':cartId')
  async deleteCart(@Param('cartId') cartId: string): Promise<void> {
    return this.cartService.deleteCart(cartId);
  }
}
