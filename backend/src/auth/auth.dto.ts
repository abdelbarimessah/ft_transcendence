import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class qrCodeDto {
  @IsNumberString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}
