import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { FeedContentType } from '@prisma/client';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class GetCollectionFeedsRequest {
  @ApiPropertyOptional({ description: '페이지 사이즈', example: 20, default: 20 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  size = 20;

  @ApiPropertyOptional({ description: '페이지 번호 (zero-base)', example: 0, default: 0 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page = 0;
}

@Exclude()
export class GetCollectionFeedsContentItem {
  @Expose()
  @ApiProperty({ description: '피드 아이디' })
  id: string;

  @Expose()
  @ApiProperty({ description: '피드 타입', enum: FeedContentType })
  type: FeedContentType;

  @Expose()
  @ApiProperty({ description: '피드 콘텐츠 URL', example: 'https://...' })
  contentSmallUrl?: string;

  @Expose()
  @ApiProperty({ description: '피드 콘텐츠 URL', example: 'https://...' })
  contentMediumUrl?: string;

  @Expose()
  @ApiProperty({ description: '피드 콘텐츠 URL', example: 'https://...' })
  contentLargeUrl?: string;
}

@Exclude()
export class GetCollectionFeedsItem {
  @Expose()
  @ApiProperty({ description: '피드 아이디' })
  id: string;

  @Expose()
  @ApiProperty({ description: '유저 아이디', example: 1 })
  userId: number;

  @Expose()
  @ApiProperty({ description: '피드 내용', example: '호떡짱' })
  description?: string;

  @Expose()
  @ApiProperty({ description: '피드 콘텐츠', type: [GetCollectionFeedsContentItem] })
  @Type(() => GetCollectionFeedsContentItem)
  contentList: GetCollectionFeedsContentItem[];

  @Expose()
  @ApiProperty({ description: '생성일', example: '2021-01-01T00:00:00.000Z' })
  createdAt: string;

  @Expose()
  @ApiProperty({ description: '수정일', example: '2021-01-01T00:00:00.000Z' })
  updatedAt: string;
}

@Exclude()
export class GetCollectionFeedsResponse {
  @Expose()
  @ApiProperty({ description: '토탈 카운트' })
  total: number;

  @Expose()
  @ApiProperty({ description: '피드 리스트', type: [GetCollectionFeedsItem] })
  @Type(() => GetCollectionFeedsItem)
  list: GetCollectionFeedsItem[];
}
