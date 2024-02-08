import { Products } from "src/product/product.entity";
import { Users } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Orders{
@PrimaryGeneratedColumn()
id:string

@Column()
totalPrice:number

@Column()
quantity:number

@Column()
status:string


@ManyToOne(() => Users, user => user.orders) // Adjusted the usage of @ManyToOne to Users
  user: Users;

  @ManyToMany(() => Products) // Define Many-to-Many relationship with Products
  @JoinTable()
  products: Products[]; // Each order can contain multiple products


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


}