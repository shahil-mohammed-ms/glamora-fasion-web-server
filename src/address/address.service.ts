// address.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { Users } from 'src/users/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Users)
    private readonly usersRepository:Repository<Users>
  ) {}

  async getByUserId(userId: string): Promise<Address[]> {
    return this.addressRepository.find({ where: { userId } });
  }

  async create(address: Address): Promise<Address> {
    return this.addressRepository.save(address);
  }

  //setting default user address
  async updateDefaultAddress(userId: string, addressId: string): Promise<Users> {
    const user = await this.usersRepository.findOne({where:{id:userId}});
    if (!user) {
      throw new Error('User not found');
    }
    user.defaultAddressId = addressId;
    return this.usersRepository.save(user);
  }
}
