import {
  IsOptional,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
  IsDate,
} from 'class-validator';
import { AccessType } from '@prisma/client';
export class newMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  chatId?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  channelId?: string;
}

export class createChannelDto {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(AccessType)
  type: AccessType;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}

export class UpdateChannelDto {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(AccessType)
  type: AccessType;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}

export class JoinChannelDto {
  @IsOptional()
  @IsString()
  password?: string;
}

export class userIdDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class userMuteDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsDate()
  expiresAt;
}

export class searchChannelsDto {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}
