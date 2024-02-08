import { Orders } from 'src/order/order.entity';
import { Wishlists } from 'src/wishlist/wishlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  password: string;
  
  @Column({ unique: true })
  email: string;

  @Column()
  isAdmin:boolean

  @OneToMany(()=>Wishlists,wishlists=>wishlists.user)
  wishlists:Wishlists[]

  @OneToMany(()=>Orders,orders=>orders.user)
  orders:Orders[]

}

