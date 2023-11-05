import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class JoinShareAlbumByInviteCodeRequest {
  @ApiProperty({ description: '대상 유저 아이디', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class JoinShareAlbumByInviteCodeResponse {
  @ApiProperty({ description: '가입된 공유앨범 아이디', example: 'clol69ajm00037zih1nw8cdea' })
  readonly shareAlbumId: string;
}
