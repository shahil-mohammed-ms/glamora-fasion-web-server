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

   //update coupn by pushing userid and decreament limit by one
   @Post('/codeupdateorder/:code/:userId')
   async codeupdateorder(
     @Param('code') code:string ,
     @Param('userId') userId:string
     ) :Promise<any>{
     const coupon = await this.couponService.isCouponAvailable(code);
     if(!coupon){ 
      return { message: 'not updated', updated: false };
     }

     const couponStatus = await this.couponService.couponStatus(coupon,userId)
     if(!couponStatus.couponStatus){
      return { message: couponStatus.message, updated: false };
     }
     const couponUpdate = await this.couponService.useCoupon(couponStatus.data,userId)
 
     return couponUpdate
 
   }

//toggle isActive

@Post(':id/toggle')
async toggleCoupon(@Param('id') id: string) {
  return this.couponService.toggleCoupon(id);
}


}
