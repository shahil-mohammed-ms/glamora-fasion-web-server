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
  const currentDate = new Date();
  const toDate = new Date(coupon.toDate); // Convert toDate from string to Date object

  if(!coupon.isActive){
    return {message:'Wrong coupon code',couponStatus:false,data:coupon};
  }
  
  if(coupon.limit<1){
    return {message:'Coupon limit reached',couponStatus:false,data:null};
  }

  if (currentDate > toDate) {
    return {message:'Current date has exceeded toDate',couponStatus:false,data:coupon};
  } 
  if (coupon.usedBy.includes(userId)) {
    return {message:'Coupon has already been used',couponStatus:false,data:null};
  }
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

async useCoupon(coupon:any,userId:string):Promise<any>{
  // Push the userId to the usedBy array
  coupon.usedBy.push(userId);
  // Decrement the limit
  coupon.limit -= 1;
 // Save the updated coupon to the database
 
 try {
  // Save the updated coupon to the database
  await this.couponRepository.save(coupon);
  return { message: 'updated', updated: true };
} catch (error) {
  console.error('Error updating coupon:', error);
  return { message: 'not updated', updated: false };
}

}

//toggle active
async toggleCoupon(id: string): Promise<{ message: string,status:boolean }> {
  const coupon = await this.couponRepository.findOne({where :{id:id }});
  if (!coupon) {
    throw new Error('Coupon not found');
  }

  coupon.isActive = !coupon.isActive; // Toggle isActive property
  await this.couponRepository.save(coupon);

  const status = coupon.isActive ? 'enabled' : 'disabled';
  return { message: `Coupon ${status} successfully`,status:coupon.isActive };
}

}
