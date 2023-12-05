import { IsEmail, IsPhoneNumber, ValidateIf, IsOptional } from 'class-validator';

export class CustomerDto {
  @IsEmail()
  @ValidateIf(o => !o.phone || o.email)
  @IsOptional()
  email?: string;

  @IsPhoneNumber()
  @ValidateIf(o => !o.email || o.phone)
  @IsOptional()
  phone?: string;
}
 