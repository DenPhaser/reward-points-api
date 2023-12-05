import {
  IsNumber
} from 'class-validator';

export class SetOrderRewardPercentageDto {
  @IsNumber()
  value: number;
}

