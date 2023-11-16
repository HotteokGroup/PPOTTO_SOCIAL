import { ApiProperty } from '@nestjs/swagger';
import { ShareAlbumMemberRole } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
class GetSharedAlbumsMemberItem {
  @Expose()
  @ApiProperty({ description: '앨범 공유 멤버 아이디', example: 1 })
  userId: number;

  @Expose()
  @ApiProperty({ description: '권한', enum: ShareAlbumMemberRole, example: ShareAlbumMemberRole.OWNER })
  role: ShareAlbumMemberRole;

  @Expose()
  @ApiProperty({ description: '가입일', example: '2023-09-28 15:53:24.586' })
  joinedAt: Date;
}

@Exclude()
class GetSharedAlbumsAlbum {
  @Expose()
  @ApiProperty({ description: '앨범 아이디', example: 'cln3cu9nl00043cwt43mzfro5' })
  id: string;

  @Expose()
  @ApiProperty({ description: '앨범 명', example: '앨범' })
  name: string;

  @Expose()
  @ApiProperty({ description: '앨범 소개', example: '내 앨범' })
  bio: string;

  @Expose()
  @Type(() => GetSharedAlbumsMemberItem)
  shareAlbumMemberList: GetSharedAlbumsMemberItem[];
}

@Exclude()
export class GetSharedAlbumsResponse {
  @Expose()
  @ApiProperty({ description: '앨범 리스트' })
  @Type(() => GetSharedAlbumsAlbum)
  list: GetSharedAlbumsAlbum[];
}
