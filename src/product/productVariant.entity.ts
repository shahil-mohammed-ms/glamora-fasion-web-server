import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./product.entity";

@Entity()
export class ProductVariants{
@PrimaryGeneratedColumn()
id:string


@ManyToOne(() => Products, product => product.variants)
product: Products;

@Column({ nullable: true })
size: string;

@Column({ nullable: true })
color: string;

@Column({ type: 'numeric', nullable: true })
price: number;

@Column({ default: 0 })
stock: number;




}