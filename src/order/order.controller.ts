// order.controller.ts
import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Orders } from './order.entity';
import { OrderStatus } from './order-status.enum';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData: Orders): Promise<Orders> {
    return this.orderService.createOrder(orderData);
  }

  @Get('/allorders/:userId')
  async getOrdersByUserId(@Param('userId') userId: string): Promise<Orders[]> {
    return this.orderService.getOrdersByUserId(userId);
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string): Promise<Orders> {
    return this.orderService.getOrderById(orderId);
  }

  //update status  url is /orders/123/status/shipped
  @Put(':orderId/status/:status')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Param('status') status: OrderStatus,
  ): Promise<void> {
    await this.orderService.updateOrderStatus(orderId, status);
  }

}
