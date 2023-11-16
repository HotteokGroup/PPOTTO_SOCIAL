import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ModifyFeedCommentRequest {
  @ApiProperty({ description: '유저 아이디', example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: '댓글 내용', example: '댓글 내용' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

@Exclude()
export class ModifyFeedCommentResponse {
  @ApiProperty({ description: '피드 아이디', example: 'clon3dw1h00003c8t7zowgde0' })
  @Expose()
  feedId: string;
}
