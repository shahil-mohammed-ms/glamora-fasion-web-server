// address.entity.ts

import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string; 

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  pinCode: number;

  @Column({nullable:true})
  additionalInfo: string;


}
