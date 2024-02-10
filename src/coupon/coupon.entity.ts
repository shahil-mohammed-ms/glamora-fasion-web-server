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
limit:number

@Column({ nullable: true })
couponDiscount:number

@Column({ nullable: true })
couponReducePrice:number

@Column({ default: true,nullable:true })
isActive:boolean

@Column('simple-array',) // Array of user IDs who have used the coupon  { default: [] }
  usedBy: string[];

@Column()
toDate:Date

}