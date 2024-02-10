import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupons } from './coupon.entity';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupons)
    private readonly couponRepository: Repository<Coupons>,
  ) {}

  async createCoupon(couponData): Promise<any> {
    const coupon = this.couponRepository.create(couponData);
    return await this.couponRepository.save(coupon);
  }

  async getAllCoupons(): Promise<Coupons[]> {
    return await this.couponRepository.find();
  }




// is coupon existing and gets coupon data
async isCouponAvailable(couponCode:string):Promise<any>{

  const coupon = await this.couponRepository.findOne({where :{code: couponCode }});
  if (!coupon) {
    return coupon; // Coupon not found,** returns null **
  }else{

    return coupon
  }
}
// fetches coupon status 
async couponStatus(coupon:any ,userId:string):Promise<any>{
console.log(coupon)
  const currentDate = new Date();
  const toDate = new Date(coupon.toDate); // Convert toDate from string to Date object

  if(!coupon.isActive){
    console.log('Wrong coupon code ,code inactive',coupon.isActive)
    return {message:'Wrong coupon code',couponStatus:false,data:coupon};
  }
  
  if(coupon.limit<1){
    console.log('Coupon limit reached',coupon.limit)
    return {message:'Coupon limit reached',couponStatus:false,data:null};
  }

  if (currentDate > toDate) {
    console.log('Current date has exceeded toDate');
    return {message:'Current date has exceeded toDate',couponStatus:false,data:coupon};
  } 
  console.log('is id used',coupon.usedBy.includes(userId))
  if (coupon.usedBy.includes(userId)) {
    console.log('Coupon has already been used');
    return {message:'Coupon has already been used',couponStatus:false,data:null};
  }
  console.log('Coupon available');
  return {message:'Coupon available',couponStatus:true,data:coupon};
}


// returns boolean checking coupon existance
async checkCouponExistance(couponCode:string):Promise<any>{

  const coupon = await this.couponRepository.findOne({where :{code: couponCode }});
  if (!coupon) {
    return false; // Coupon not found,** returns null **
  }else{

    return true
  }
}


}
