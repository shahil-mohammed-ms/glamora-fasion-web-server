import { Products } from "src/product/product.entity";
import { Users } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "./order-status.enum";
import { Address } from "src/address/address.entity";




@Entity()
export class Orders{
@PrimaryGeneratedColumn()
id:string

@Column()
totalPrice:number

@Column()
quantity:number

// @Column()
// addressId:string
@OneToOne(() => Address)
  @JoinColumn() // Ensure you have JoinColumn specified for one-to-one relationships
  address: Address; // This establishes a one-to-one relationship with Address


@Column({
  type: "enum",
  enum: OrderStatus,
  default: OrderStatus.PENDING,
})
status: OrderStatus;


@ManyToOne(() => Users, user => user.orders) // Adjusted the usage of @ManyToOne to Users
  user: Users;

  @ManyToMany(() => Products) // Define Many-to-Many relationship with Products
  @JoinTable()
  products: Products[]; // Each order can contain multiple products


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


}