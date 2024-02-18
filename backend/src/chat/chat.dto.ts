import {
  IsOptional,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { AccessType } from '@prisma/client';
export class newMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  chatId?: string;

  @IsOptional()
  @IsString()
  channelId?: string;
}

export class createChatDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class createChannelDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsEnum(AccessType)
  type: AccessType;

  @IsString()
  @IsOptional()
  password?: string;
}

export class UpdateChannelDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(AccessType)
  type?: AccessType;

  @IsOptional()
  @IsString()
  password?: string;
}

export class JoinChannelDto {
  @IsOptional()
  @IsString()
  password?: string;
}
