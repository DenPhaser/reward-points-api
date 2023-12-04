import { IsEmail, IsPhoneNumber, ValidateIf, IsOptional } from 'class-validator';

export class CustomerDto {
  @IsEmail()
  @ValidateIf(o => !o.phone)
  @IsOptional()
  email?: string;

  @IsPhoneNumber()
  @ValidateIf(o => !o.email)
  @IsOptional()
  phone?: string;
}
 