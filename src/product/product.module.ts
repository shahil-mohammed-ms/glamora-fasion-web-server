import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Products } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariants } from './productVariant.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Products,ProductVariants])
    ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
