import { Products } from "src/product/product.entity";
import { Users } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";


@Entity()
export class Coupons{
@PrimaryGeneratedColumn()
id:string

@Column()
code:string

@Column()
couponDiscound:number

@Column()
toDate:Date

}