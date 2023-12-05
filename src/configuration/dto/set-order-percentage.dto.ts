import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber
} from 'class-validator';

export class SetOrderRewardPercentageDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  value: number;
}

