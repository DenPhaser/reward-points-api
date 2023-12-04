import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from 'src/customer/customer.entity';
import { NotFoundException } from '@nestjs/common';
import { CustomerDto } from '../dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async get(customerDto: CustomerDto): Promise<Customer> {
    let customer: Customer;

    if (customerDto.email) {
      customer = await this.getByEmail(customerDto.email);
    } else if (customerDto.phone) {
      customer = await this.getByPhone(customerDto.phone);
    }

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async getId(customerDto): Promise<number> {
    const customer = await this.get(customerDto)
    return customer.id
  }

  getByEmail(email: string): Promise<Customer> {
    return this.customerRepository.findOne({ where: { email } });
  }

  getByPhone(phone: string): Promise<Customer> {
    return this.customerRepository.findOne({ where: { phone } });
  }
}
