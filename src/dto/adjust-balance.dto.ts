import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsInt,
  ValidateNested,
} from 'class-validator';

import { CustomerDto } from './customer.dto';

export class AdjustBalanceDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  customer: CustomerDto;

  @IsInt()
  amount: number;
}

