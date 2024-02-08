import { Injectable } from '@nestjs/common';
import { Products } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Products> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async getProducts(): Promise<Products[]> {
    return await this.productRepository.find({ relations: ['variants'] });
  }

  async getProductById(id: string): Promise<Products | undefined> {

    return await this.productRepository
    .createQueryBuilder('product')
    .leftJoinAndSelect('product.variants', 'variants')
    .where('product.id = :id', { id })
    .getOne();
   
  }

}
