import { Injectable } from '@nestjs/common';
import { CustomerDto } from './dto/customer.dto';
import { CustomerService } from './customer/customer.service';
import { CurrencyService } from './currency/currency.service';
import { PointsService } from './points/points.service';
import { ProcessOrderDto } from './dto/process-order.dto';
import { AddPointsDto } from './dto/add-points.dto';
import { ConfigurationService } from './configuration/configuration.service';

@Injectable()
export class AppService {
  constructor(
    private readonly configurationService: ConfigurationService,
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

    const percentage = await this.configurationService.getOrderPercentage()

    const points = paidJPY * percentage / 100;

    await this.pointsService.add(customerId, points, dto.order.id);
  }

  async addPoints(
    dto: AddPointsDto
  ): Promise<void> {
    const customerId = await this.customerService.getId(dto.customer);
    await this.pointsService.add(customerId, dto.amount)
  }

  async getBalance(customerDto: CustomerDto): Promise<number> {
    const customerId = await this.customerService.getId(customerDto);
    const points = await this.pointsService.get(customerId)

    return points
  }
}
