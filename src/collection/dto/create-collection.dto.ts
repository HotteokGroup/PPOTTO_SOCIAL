import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCollectionRequest {
  @ApiProperty({ description: '회원 아이디', example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: '컬렉션명', example: '내 컬렉션' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '컬렉션 설명', example: '내가 만든 컬렉션' })
  @IsOptional()
  description?: string;
}

@Exclude()
export class CreateCollectionResponse {
  @Expose()
  @ApiProperty({ description: '컬렉션 아이디' })
  collectionId: string;
}
