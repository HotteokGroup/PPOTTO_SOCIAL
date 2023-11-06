import { ApiProperty } from '@nestjs/swagger';

export class CreateShareAlbumInviteCodeResponse {
  @ApiProperty({ description: '생성된 초대 코드', example: 'I8Q32D' })
  readonly inviteCode: string;
}
