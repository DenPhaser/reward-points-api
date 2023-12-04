import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';

import { CustomerDto } from './customer.dto';
import { OrderDto } from './order.dto';

export class ProcessOrderDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  customer: CustomerDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  order: OrderDto;
}

