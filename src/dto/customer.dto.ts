import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CustomerDto {
//   @IsEmail()
  @IsString()
  email: string;

//   @IsPhoneNumber()
  @IsString()
  phone: string;
}
