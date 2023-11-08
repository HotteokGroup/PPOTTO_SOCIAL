import { ApiProperty } from '@nestjs/swagger';
import { FeedContentType } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateShareAlbumFeedItem {
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

export class CreateShareAlbumFeedRequest {
  @ApiProperty({ description: '유저 아이디', example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: '피드 내용', example: '피드 내용' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '피드 콘텐츠', type: [CreateShareAlbumFeedItem] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateShareAlbumFeedItem)
  contents: CreateShareAlbumFeedItem[];
}

@Exclude()
export class CreateShareAlbumFeedResponse {
  @ApiProperty({ description: '피드 아이디', example: '123g21hj2' })
  @Expose()
  feedId: string;
}
