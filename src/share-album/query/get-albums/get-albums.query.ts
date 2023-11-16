import { ShareAlbumMember } from '@prisma/client';

export class GetSharedAlbumsQuery {
  readonly userId: number;

  constructor(params: GetSharedAlbumsQuery) {
    Object.assign(this, params);
  }
}

export class GetSharedAlbumsQueryResult {
  list: {
    /** 앨범 아이디 */
    id: string;

    /** 앨범 명 */
    name: string;

    /** 앨범 소개 */
    bio: string;

    /** 앨범 맴버 */
    shareAlbumMemberList: ShareAlbumMember[];
  }[];

  constructor(params: GetSharedAlbumsQueryResult) {
    Object.assign(this, params);
  }
}
