import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from 'src/customer.entity';
import { NotFoundException } from '@nestjs/common';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  adjustPoints(
    customer_id: number,
    amount: number,
    order_guid?: string,
  ): Promise<any> {
    return this.customerRepository
        .query(
            'CALL adjust_points(?, ?, ?)',
            [customer_id, amount, order_guid]
        )
  }

  async getBalance(customerDto: CustomerDto): Promise<number> {
    // TODO: add reading from cache

    const customer = await this.getCustomer(customerDto)

    return customer.points
  }

  async getCustomer(customerDto: CustomerDto): Promise<Customer> {

    let customer: Customer;

    if (customerDto.email) {
      customer = await this.getCustomerByEmail(customerDto.email)
    } else if (customerDto.phone) {
      customer = await this.getCustomerByPhone(customerDto.phone)
    }

    if (!customer) {
      throw new NotFoundException('Customer not found')
    }

    return customer
  }

  getCustomerByEmail(email: string): Promise<Customer> {
		return this.customerRepository.findOne({ where: { email } })
	}

	getCustomerByPhone(phone: string): Promise<Customer> {
		return this.customerRepository.findOne({ where: { phone } })
	}
}
