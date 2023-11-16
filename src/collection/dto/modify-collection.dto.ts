import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ModifyCollectionRequest {
  @ApiProperty({ description: '컬렉션 이름', example: '컬렉션 이름' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ description: '컬렉션 설명', example: '컬렉션 설명' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}

@Exclude()
export class ModifyCollectionResponse {
  @Expose()
  @ApiProperty({ description: '수정된 컬렉션 아이디', example: 'clp0wkn6k00007z209fylkkgg' })
  collectionId: string;
}
