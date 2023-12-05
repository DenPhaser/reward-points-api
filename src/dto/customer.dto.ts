import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, ValidateIf, IsOptional, IsNotEmpty } from 'class-validator';

export class CustomerDto {
  @ApiProperty({ example: "user1@example.com" })
  @IsEmail()
  @IsNotEmpty()
  @ValidateIf(o => o.email || !o.phone)
  email?: string;

  @ApiProperty({ example: null })
  @IsPhoneNumber()
  @IsNotEmpty()
  @ValidateIf(o => o.phone || !o.email)
  phone?: string;
}
 