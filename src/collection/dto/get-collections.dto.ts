import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class GetCollectionsRequest {
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

  @ApiProperty({ description: '고객 아이디', example: 1 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  userId: number;
}

@Exclude()
export class GetCollectionsItem {
  @Expose()
  @ApiProperty({ description: '컬렉션 아이디' })
  id: string;

  @Expose()
  @ApiProperty({ description: '컬렉션 이름' })
  name: string;

  @Expose()
  @ApiProperty({ description: '컬렉션 설명' })
  description?: string;

  @Expose()
  @ApiProperty({ description: '컬렉션 생성일' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: '컬렉션 수정일' })
  updatedAt: Date;
}

export class GetCollectionsResponse {
  @ApiProperty({ description: '토탈 카운트' })
  total: number;

  @ApiProperty({ description: '컬렉션 리스트', type: [GetCollectionsItem] })
  @Type(() => GetCollectionsItem)
  list: GetCollectionsItem[];
}
