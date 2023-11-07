import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeleteShareAlbumFeedCommentRequest {
  @ApiProperty({ description: '유저 아이디', example: 1 })
  @IsNumber()
  userId: number;
}

@Exclude()
export class DeleteShareAlbumFeedCommentResponse {
  @Expose()
  @ApiProperty({ description: '피드 아이디', example: 'clon3ftt600073c8tpy32nkao' })
  feedId: string;
}
