import { Products } from "src/product/product.entity";
import { Users } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";

@Entity()
export class Carts{

  @PrimaryGeneratedColumn()
  id:string
  
  
  @ManyToOne(() => Users, user => user.carts) // Adjusted the usage of @ManyToOne to Users
    user: Users;

    @ManyToOne(()=>Products)
  product:Products


@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


}
