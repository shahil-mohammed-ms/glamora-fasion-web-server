import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Users } from 'src/users/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Address,Users])],
  providers: [AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
