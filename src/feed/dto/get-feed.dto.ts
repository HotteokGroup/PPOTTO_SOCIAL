import { ApiProperty } from '@nestjs/swagger';
import { FeedContentType } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class GetFeedContentItem {
  @Expose()
  @ApiProperty({ description: '콘텐츠 아이디' })
  id: string;

  @Expose()
  @ApiProperty({ description: '콘텐츠 타입', enum: FeedContentType })
  type: FeedContentType;

  @Expose()
  @ApiProperty({ description: '콘텐츠 URL', example: 'https://...' })
  contentSmallUrl: string;

  @Expose()
  @ApiProperty({ description: '콘텐츠 URL', example: 'https://...' })
  contentMediumUrl: string;

  @Expose()
  @ApiProperty({ description: '콘텐츠 URL', example: 'https://...' })
  contentLargeUrl: string;
}

@Exclude()
export class GetFeedCommentItem {
  @Expose()
  @ApiProperty({ description: '코멘트 아이디' })
  id: string;

  @Expose()
  @ApiProperty({ description: '유저 아이디', example: 1 })
  userId: number;

  @Expose()
  @ApiProperty({ description: '내용', example: '호떡짱' })
  description: string;

  @Expose()
  @ApiProperty({ description: '생성일', example: '2021-01-01T00:00:00.000Z' })
  createdAt: string;
}

@Exclude()
export class GetFeedResponse {
  @Expose()
  @ApiProperty({ description: '피드 아이디' })
  id: string;

  @Expose()
  @ApiProperty({ description: '유저 아이디', example: 1 })
  userId: number;

  @Expose()
  @ApiProperty({ description: '피드 내용', example: '호떡짱' })
  description: string;

  @Expose()
  @ApiProperty({ description: '피드 콘텐츠', type: [GetFeedContentItem] })
  @Type(() => GetFeedContentItem)
  contentList: GetFeedContentItem[];

  @Expose()
  @ApiProperty({ description: '피드 코멘트', type: [GetFeedCommentItem] })
  @Type(() => GetFeedCommentItem)
  commentList: GetFeedCommentItem[];

  @Expose()
  @ApiProperty({ description: '생성일', example: '2021-01-01T00:00:00.000Z' })
  createdAt: string;

  @Expose()
  @ApiProperty({ description: '수정일', example: '2021-01-01T00:00:00.000Z' })
  updatedAt: string;
}
