import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';

@Module({
  imports: [
	  TypeOrmModule.forFeature([Customer]),
  ],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule {}
