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
import { ApiTags, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { validate } from 'class-validator';

import { AppService as AppService } from './app.service';
import { AddPointsDto } from './dto/add-points.dto';
import { ProcessOrderDto } from './dto/process-order.dto';
import { CustomerDto } from './dto/customer.dto';

@ApiTags('points')
@Controller()
export class AppController {
  constructor(
	private readonly service: AppService
  ) {}

  @ApiOperation({
    summary: 'Processes order.'
  })
  @ApiResponse({ status: 200, description: 'Completed without errors.' })
  @ApiResponse({ status: 403, description: 'Customer cannot have a negative balance.' })
  @ApiResponse({ status: 409, description: 'Can\'t reward points for an already processed order.' })
  @Post('orders/new')
  async processOrder(@Body() dto: ProcessOrderDto): Promise<any> {
    
	  await this.service.processOrder(dto)

    return {
      message: 'OK',
    };
  }

  @ApiOperation({
    summary: 'Retrieves customer\'s balance.'
  })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'phone', required: false })
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

  @ApiOperation({
    summary: 'Adds/Substracts (if negative) points from customer\'s balance.'
  })
  @ApiResponse({ status: 200, description: 'Completed without errors.' })
  @ApiResponse({ status: 403, description: 'Customer cannot have a negative balance.' })
  @Patch('points')
  async addPoints(@Body() dto: AddPointsDto): Promise<any> {
    await this.service.addPoints(dto);

    return {
      message: 'OK',
    };
  }
}
