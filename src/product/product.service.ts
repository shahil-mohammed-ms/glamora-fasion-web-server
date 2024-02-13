import { Injectable } from '@nestjs/common';
import { Products } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}
  async createProduct(createProductDto:CreateProductDto,imageUrls: string[]):Promise<any> {
 
    const dataBind = {
      ...createProductDto,
      imageUrls,
    };
  
    const res =  this.productRepository.create(dataBind)
  
    const product= await this.productRepository.save(res)
  
    return  { message: 'Data uploaded Successfully', statusCode: 200, data: { product } };
  
  }
  // async createProduct(createProductDto: CreateProductDto): Promise<Products> {
  //   const product = this.productRepository.create(createProductDto);
  //   return await this.productRepository.save(product);



  // }




  async getProducts(): Promise<Products[]> {
    const pageNumber = 2; // Current page number
const itemsPerPage = 2; // Number of items per page
    return await this.productRepository.find({ relations: ['variants'], skip: (pageNumber - 1) * itemsPerPage,
    take: itemsPerPage,order: { createdAt: 'DESC' }  });
  }

  async getProductById(id: string): Promise<Products | undefined> {

    return await this.productRepository
    .createQueryBuilder('product')
    .leftJoinAndSelect('product.variants', 'variants')
    .where('product.id = :id', { id })
    .getOne();
   
  }









async updateProduct(productId:string,
  body:any,imageUrls:string[]):Promise<any>{

    const productToUpdate = await this.productRepository.findOne({ where: {id: productId } })
    if (!imageUrls || imageUrls.length === 0) {
    
      const productUpdate = await this.productRepository.update({id:productId},body)


      return { message: 'Data updated Successfully', statusCode: 200, data: [] };

    }else{
    
      const dataBind = {
        ...body,
        imageUrls,
      };
      try {
        const productUpdate = await this.productRepository.update({id:productId},dataBind)
           this.deleteOldProductImages(productToUpdate.imageUrls)

        return    { message: 'Data updated Successfully', statusCode: 200, data: [] };
        
      } catch (error) {
        console.log(error)
      }
     
    }
 }


 async deleteById (productId:string):Promise<any> {

  try {
    const productById = await this.productRepository.findOne({ where: {id: productId } })
console.log('probyid',productById)
    const deleted= await this.productRepository.remove(productById)
    console.log('deletebyid',deleted)
    await this.deleteOldProductImages(deleted.imageUrls)
   
     return { message: 'Data deleted Successfully', statusCode: 200, data: [] };
  } catch (error) {
    return { message: 'failed', statusCode: 501, data: [] };
  }

}

  private deleteOldProductImages(imgUrls: string[]) {
    const productImagePath = './public/product';
    
    // Delete specific files based on the array of image names
    imgUrls.forEach((imgUrl) => {
      const filePath = path.join(productImagePath, imgUrl);
      // Check if the file exists before attempting to delete
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }

}
