import { IsString, IsNotEmpty } from 'class-validator';

export class updateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  nickName: string;
}

export class providerIdDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
