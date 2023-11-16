import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteCollectionResponse {
  @ApiProperty({ description: '삭제된 컬렉션 아이디', example: 'clp0wkn6k00007z209fylkkgg' })
  @IsString()
  collectionId: string;
}
