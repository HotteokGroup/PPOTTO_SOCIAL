import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DeleteShareAlbumMemberResponse {
  @Expose()
  @ApiProperty({ description: '앨범 아이디', example: 'clol6tnm100037zzpnfut389l' })
  albumId: string;
}
