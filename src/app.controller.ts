import { Body, Controller, Get, HttpCode, Param, Query, Patch, Post } from '@nestjs/common';
import { AppService as AppService } from './app.service';
import { ProcessOrderDto } from './dto/process-order.dto';
import { AdjustBalanceDto } from './dto/adjust-balance.dto';
import { CustomerDto } from './dto/customer.dto';
import { validate } from 'class-validator';

@Controller()
export class AppController {
	constructor(private readonly service: AppService) {}

	@Post('orders/new')
	async processOrder(
		@Body() dto: ProcessOrderDto
	): Promise<any> {

		const customer = await this.service.getCustomer(dto.customer)

		// TODO: calculate points correctly 
		// TODO: take into account currency
		const points = dto.order.paid * .01

		await this.service.adjustPoints(
			customer.id,
			points,
			dto.order.id
		)

		return {
			message: 'OK'
		}
  	}

	@Get('points')
  	async getBalance(
		@Query('email') email: string,
		@Query('phone') phone: string
	): Promise<any> {
		
		const customerDto = new CustomerDto()
		customerDto.email = email
		customerDto.phone = phone

		const balance = await this.service.getBalance(customerDto)

		return {
			message: "Customer's point balance",
			balance: balance
		}
	}

	@Patch('points')
  	async adjustBalance(
		@Body() dto: AdjustBalanceDto
	): Promise<any> {
		const customer = await this.service.getCustomer(dto.customer)

		await this.service.adjustPoints(
			customer.id,
			dto.amount
		)

	}
}
