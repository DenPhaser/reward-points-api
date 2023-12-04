import { Injectable } from '@nestjs/common';
import { CustomerDto } from './dto/customer.dto';
import { CustomerService } from './customer/customer.service';
import { CurrencyService } from './currency/currency.service';
import { PointsService } from './points/points.service';
import { ProcessOrderDto } from './dto/process-order.dto';
import { AdjustBalanceDto } from './dto/adjust-balance.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly currencyService: CurrencyService,
    private readonly pointsService: PointsService,
  ) {}

  async processOrder(dto: ProcessOrderDto): Promise<void> {
    const customerId = await this.customerService.getId(dto.customer);

    const paidJPY = await this.currencyService.convertToJPY(
      dto.order.paid,
      dto.order.currency,
    );
    const points = paidJPY * 0.01; // TODO: make the percentage configurable

    await this.pointsService.add(customerId, points, dto.order.id);
  }

  async addPoints(
    dto: AdjustBalanceDto
  ): Promise<void> {
    const customerId = await this.customerService.getId(dto.customer);
    this.pointsService.add(customerId, dto.amount)
  }

  async getBalance(customerDto: CustomerDto): Promise<number> {
    const customerId = await this.customerService.getId(customerDto);
    const points = await this.pointsService.get(customerId)

    return points
  }
}
