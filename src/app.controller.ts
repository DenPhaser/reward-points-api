import {
  Body,
  Controller,
  Get,
  Query,
  Patch,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AppService as AppService } from './app.service';
import { ProcessOrderDto } from './dto/process-order.dto';
import { AdjustBalanceDto as AddPointsDto } from './dto/adjust-balance.dto';
import { CustomerDto } from './dto/customer.dto';
import { validate } from 'class-validator';

@Controller()
export class AppController {
  constructor(
	private readonly service: AppService
  ) {}

  @Post('orders/new')
  async processOrder(@Body() dto: ProcessOrderDto): Promise<any> {
    
	await this.service.processOrder(dto)

    return {
      message: 'OK',
    };
  }

  @Get('points')
  async getBalance(
    @Query('email') email: string,
    @Query('phone') phone: string,
  ): Promise<any> {
    const customerDto = new CustomerDto();
    customerDto.email = email;
    customerDto.phone = phone;

    const validationErrors = await validate(customerDto, {
      validationError: {
        target: false,
        value: false,
      },
    });
    if (validationErrors.length) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Validation failed',
          messages: validationErrors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const balance = await this.service.getBalance(customerDto);

    return {
      message: "Customer's point balance",
      balance: balance,
    };
  }

  @Patch('points')
  async addPoints(@Body() dto: AddPointsDto): Promise<any> {
    await this.service.addPoints(dto);

    return {
      message: 'OK',
    };
  }
}
