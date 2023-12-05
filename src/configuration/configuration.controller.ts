import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SetOrderRewardPercentageDto } from './dto/set-order-percentage.dto';
import { ConfigurationService } from './configuration.service';

@ApiTags('configuration')
@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly service: ConfigurationService) {}

  @Get('order-reward-percentage')
  async getOrderRewardPercentage(): Promise<any> {
    const value = await this.service.getOrderPercentage();

    return {
      message: 'Current value',
      value: value,
    };
  }

  @Put('order-reward-percentage')
  async setOrderRewardPercentage(
    @Body() dto: SetOrderRewardPercentageDto,
  ): Promise<any> {
    await this.service.setOrderPercentage(dto.value);

    return {
      message: 'OK',
    };
  }
}
