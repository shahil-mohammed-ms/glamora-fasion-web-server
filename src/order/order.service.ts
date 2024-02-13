// order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './order.entity';
import { OrderStatus } from './order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
  ) {}

  async createOrder(orderData: Orders): Promise<Orders> {
    return this.orderRepository.save(orderData);
  }

  // async getOrdersByUserId(userId: string): Promise<Orders[]> {
  //   return this.orderRepository
  //     .createQueryBuilder('order')
  //     .leftJoinAndSelect('order.products', 'product')
  //     .leftJoinAndSelect('order.user', 'user')
  //     .select(['order', 'product', 'user.id', 'user.username', 'user.email']) // Select only necessary fields
  //     .where('user.id = :userId', { userId })
  //     .getMany();
  // }
  async getOrdersByUserId(userId: string): Promise<Orders[]> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.products', 'product')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.address', 'address') // Join with address entity
      .select([
        'order',
        'product',
        'user.id',
        'user.username',
        'user.email',
        'address' // Include address details
      ])
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async getOrderById(orderId: string): Promise<Orders> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.products', 'product')
      .leftJoinAndSelect('order.user', 'user')
      .where('order.id = :orderId', { orderId })
      .getOne();
  }
  

//update status
async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  await this.orderRepository.update({ id: orderId }, { status });
}

}
