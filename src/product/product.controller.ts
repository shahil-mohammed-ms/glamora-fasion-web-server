import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  async getProducts(): Promise<Products[]> {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Products | undefined> {
    return await this.productService.getProductById(id);
  }

}
