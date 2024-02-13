import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './product.entity';
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Post()
@UseInterceptors(FilesInterceptor('productImage', 5, {
  storage: diskStorage({
    destination: './public/product',  // Specify the destination folder
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      const fileName = file.fieldname + '-' + uniqueSuffix + extension;
      callback(null, fileName);
    },
  }),
}))
async createProduct(
  @UploadedFiles() productImages: any[],  // Array of uploaded files
  @Body() createProductDto: CreateProductDto,
): Promise<any> {
  try {
    
    if (!productImages || productImages.length === 0) {
      throw new Error('No images uploaded');
    }
    console.log('Request Body:',createProductDto);
    // Handle multiple uploaded images
    const imageUrls = productImages.map(image => image.filename);
    console.log('Uploaded Image urls:', imageUrls);
    

    return await this.productService.createProduct(createProductDto,imageUrls)
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to create product');
  }
}





  // @Post()
  // async createProduct(@Body() createProductDto: CreateProductDto) {
  //   return await this.productService.createProduct(createProductDto);
  // }



  @Get()
  async getProducts(): Promise<Products[]> {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Products | undefined> {
    return await this.productService.getProductById(id);
  }

  @Put()
  @UseInterceptors(FilesInterceptor('productImage', 5, {
    storage: diskStorage({
      destination: './public/product',  // Specify the destination folder
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const fileName = file.fieldname + '-' + uniqueSuffix + extension;
        callback(null, fileName);
      },
    }),
  }))
  async updateProduct(
    @UploadedFiles() productImages: any[],
    @Body() body:string,
    @Query('id') productId:string,
  ):Promise<any> {
  
  const imageUrls = productImages.map(image => image.filename);
  
    return await this.productService.updateProduct(productId,body,imageUrls)
  }
  
  @Delete(':id')
async deleteById(@Param('id') productId :string):Promise<any>{

return await this.productService.deleteById(productId)

}

}
