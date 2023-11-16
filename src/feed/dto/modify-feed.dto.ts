import { ApiProperty } from '@nestjs/swagger';
import { FeedContentType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, IsEnum, IsOptional, ArrayMinSize, IsArray } from 'class-validator';

export class ModifyFeedItem {
  @ApiProperty({ description: '콘텐츠 아이디', example: '123g21hj2' })
  @IsString()
  contentId: string;

  @ApiProperty({ description: '콘텐츠 타입', example: FeedContentType.IMAGE, enum: FeedContentType })
  @IsEnum(FeedContentType)
  type: FeedContentType;

  @ApiProperty({ description: '콘텐츠 URL', example: 'https://image.com' })
  @IsOptional()
  @IsString()
  contentSmallUrl?: string;

  @ApiProperty({ description: '콘텐츠 URL', example: 'https://image.com' })
  @IsOptional()
  @IsString()
  contentMediumUrl?: string;

  @ApiProperty({ description: '콘텐츠 URL', example: 'https://image.com' })
  @IsOptional()
  @IsString()
  contentLargeUrl?: string;
}

export class ModifyFeedRequest {
  @ApiProperty({ description: '피드 내용', example: '피드 내용' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '피드 콘텐츠', type: [ModifyFeedItem] })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ModifyFeedItem)
  contents?: ModifyFeedItem[];
}
