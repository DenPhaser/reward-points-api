import { IsCurrency, IsNumber, IsUUID, Min } from 'class-validator';

export class OrderDto {
  @IsUUID()
  id: string;

  @IsNumber()
  @Min(0)
  paid: number;

  @IsCurrency()
  currency: string;
}
