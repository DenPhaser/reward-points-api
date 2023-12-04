import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PointsService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async add(
    customerId: number,
    amount: number,
    order_guid?: string,
  ): Promise<any> {
    return this.dataSource.query('CALL adjust_points(?, ?, ?)', [
      customerId,
      amount,
      order_guid,
    ]);
  }

  async get(customerId: number): Promise<number> {
    const result = await this.dataSource.query('SELECT points FROM `Customer` WHERE id = ?', [ customerId ]);

    return result[0].points
  }
}
