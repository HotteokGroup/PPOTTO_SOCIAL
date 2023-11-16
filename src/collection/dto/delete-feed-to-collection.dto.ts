import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteFeedToCollectionRequest {
  @ApiProperty({ description: '피드 아이디', example: 'clp0wkn6k00007z209fylkkgg' })
  @IsString()
  @IsNotEmpty()
  feedId: string;
}

@Exclude()
export class DeleteFeedToCollectionResponse {
  @Expose()
  @ApiProperty({ description: '컬렉션 아이디', example: 'clp0wkn6k00007z209fylkkgg' })
  collectionId: string;
}
