// create-product.dto.ts
export class CreateProductDto {
  name: string;
  description: string;
  category: string;
  size: string;
  imageUrls: string[];
  variants: {
    size: string;
    price: number;
    stock: number;
  }[];
}
