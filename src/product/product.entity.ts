import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductVariants } from "./productVariant.entity";

@Entity()
export class Products{
@PrimaryGeneratedColumn()
id:string

@Column()
name:string

@Column()
description:string


@Column()
category:string

@Column()
size:string

@Column('simple-array')
imageUrls:string[]


@OneToMany(() => ProductVariants,  variant => variant.product, { cascade: true })
variants: ProductVariants[];

@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

}
