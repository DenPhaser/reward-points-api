import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CustomerDto } from './customer.dto';

export class AddPointsDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  customer: CustomerDto;

  @ApiProperty()
  @IsInt()
  amount: number;
}

