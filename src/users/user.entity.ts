import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

}

