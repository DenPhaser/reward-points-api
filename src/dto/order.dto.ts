import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsNumber, IsUUID, Min } from 'class-validator';

export class OrderDto {
  @ApiProperty({ example: "0000d7e0-a188-4ffd-9af7-20d7876f70ab" })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  paid: number;

  @ApiProperty({ example: 'usd' })
  @IsCurrency()
  currency: string;
}
