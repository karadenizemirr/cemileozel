import { Module } from '@nestjs/common';
import { UserModule } from './DAL/user/user.module';
import { HouseModul } from './DAL/house/house.module';
import { AppoinmentModule } from './DAL/appoinment/appoinment.module';
import { PaymentModule } from './DAL/payment/payment.module';

@Module({
  imports: [
    HouseModul, 
    UserModule, 
    AppoinmentModule, 
    PaymentModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
