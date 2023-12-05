import {
  ForbiddenException,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class PointsService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async add(
    customerId: number,
    amount: number,
    order_guid: string = null
    ): Promise<any> {
    const queryResult = await this.dataSource.query(
      /*sql*/ `CALL sp_addPoints(?, ?, ?, @result); SELECT @result AS result;`,
      [customerId, amount, order_guid],
    );

    const status = parseInt(queryResult[queryResult.length - 1][0].result);

    switch (status) {
      // Negative balance
      case -1:
        throw new ForbiddenException(
          'Customer cannot have a negative balance.',
        );
        break;
      // Existing order
      case 0:
        throw new ConflictException(
          `Points for order ${order_guid} were already added.`,
        );
        break;
    }
  }

  async get(customerId: number): Promise<number> {
    const result = await this.dataSource.query(
      /*sql*/ `SELECT points FROM Customer WHERE id = ?`,
      [customerId],
    );

    return result[0].points;
  }
}
