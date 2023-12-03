import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
	constructor(
		@InjectRepository(Customer)
		private readonly customerRepository: Repository<Customer>,
	) {}

	getByEmail(email: string): Promise<Customer> {
		return this.customerRepository.findOne({ where: { email } })
	}

	getByPhone(phone: string): Promise<Customer> {
		return this.customerRepository.findOne({ where: { phone } })
	}
}
