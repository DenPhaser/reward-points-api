import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Setting } from './setting.entity';
import { SettingName } from './setting-name.enum';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(Setting)
    private readonly repository: Repository<Setting>,
  ) {}

  public async getOrderPercentage(): Promise<number> {
    const setting = await this.get(SettingName.OrderRewardPercentage);

    return parseFloat(setting.value);
  }

  public async setOrderPercentage(value: number): Promise<void> {
    const setting = await this.get(SettingName.OrderRewardPercentage);

    setting.value = value.toString();
    await this.repository.save(setting);
  }

  private async get(name: SettingName): Promise<Setting> {
    // TODO: add caching

    const setting = await this.repository.findOne({ where: { name } });

    if (!setting) {
      throw new Error(`Setting '${name}' not found.`);
    }

    return setting;
  }
}
