import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlists } from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlists)
    private readonly wishlistRepository: Repository<Wishlists>,
  ) {}

  async createWishlist(wishlistData): Promise<any> {
    const wishlist = this.wishlistRepository.create(wishlistData);
    return await this.wishlistRepository.save(wishlist);
  }

  async getAllWishlists(): Promise<Wishlists[]> {
    return await this.wishlistRepository.find({ relations: ['product'] });
  }

  async deleteWishlist(wishlistId: string): Promise<void> {
    await this.wishlistRepository.delete(wishlistId);
  }

}
