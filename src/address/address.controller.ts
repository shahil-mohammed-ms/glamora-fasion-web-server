// address.controller.ts

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':userId')
  async getByUserId(@Param('userId') userId: string): Promise<Address[]> {
    return this.addressService.getByUserId(userId);
  }

  @Post()
  async create(@Body() address: Address): Promise<Address> {
    return this.addressService.create(address);
  }

  @Post('setDefaultAddress/:userId/:addressId')
  async setDefaultAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
  ): Promise<any> {
    return this.addressService.updateDefaultAddress(userId, addressId);
  }
  
}

