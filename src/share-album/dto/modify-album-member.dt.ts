import { ApiProperty } from '@nestjs/swagger';
import { ShareAlbumMemberRole } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';

export class ModifyShareAlbumMemberRequest {
  @ApiProperty({ description: '앨범 권한', example: ShareAlbumMemberRole.EDITOR, enum: ShareAlbumMemberRole })
  @IsEnum(ShareAlbumMemberRole)
  role: ShareAlbumMemberRole;
}

@Exclude()
export class ModifyShareAlbumMemberResponse {
  @Expose()
  @ApiProperty({ description: '앨범 아이디', example: 'clol6tnm100037zzpnfut389l' })
  albumId: string;
}
