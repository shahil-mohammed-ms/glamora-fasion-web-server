import { Injectable } from '@nestjs/common';
import { Carts } from './cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private readonly cartRepository: Repository<Carts>,
  ) {}
  async createCart(cartData: any): Promise<any> {
    const { userId, productId } = cartData;
    
    // Check if the product is already in the cart for the given user
    const existingCart = await this.cartRepository.findOne({ where: { user: userId, product: productId } });
    
    // If the product is already in the cart, return an error or handle it as required
    if (existingCart) {
        return 'product already exists'
    }

    // If the product is not in the cart, create a new cart entry
    const cart = this.cartRepository.create(cartData);
    return await this.cartRepository.save(cart);
}


  async getAllCartsByUserId(userId: string): Promise<Carts[]> {
    try {
      const carts = await this.cartRepository
        .createQueryBuilder('cart')
        .innerJoinAndSelect('cart.product', 'product') // Join products
        .innerJoin('cart.user', 'user') // Join user
        .where('user.id = :userId', { userId })
        .getMany();

      return carts;
    } catch (error) {
      console.error('Error fetching carts by user ID:', error);
      throw error;
    }
}



  async deleteCart(CartId: string): Promise<void> {
    await this.cartRepository.delete(CartId);
  }


}
