import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CouponService } from './coupon.service';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  async createCoupon(@Body() couponData) {
    return this.couponService.createCoupon(couponData);
  }

  @Get()
  async getAllCoupons() {
    return this.couponService.getAllCoupons();
  }


  // checks coupons availability
  @Get('/isavalable/:code/:userId')
  async isCouponAvailable(
    @Param('code') code:string ,
    @Param('userId') userId:string
    ) {
    const coupon = await this.couponService.isCouponAvailable(code);

    if(coupon===null){
      console.log(coupon)
      return {message:'Wrong coupon code',couponStatus:false,data:coupon}; // if coupon donot exist
    }

    return await this.couponService.couponStatus(coupon,userId)

  }

   // checks coupons availability and returns boolean
   @Get('/isavalable/:code')
   async checkCouponExistance(
     @Param('code') code:string 
     ) {
     const coupon = await this.couponService.checkCouponExistance(code);
 
     return coupon
 
   }

}
