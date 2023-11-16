import { ShareAlbumMember } from '@prisma/client';

export class GetSharedAlbumQuery {
  readonly id: string;

  constructor(params: GetSharedAlbumQuery) {
    Object.assign(this, params);
  }
}

export class GetSharedAlbumQueryResult {
  /** 앨범 아이디 */
  readonly id: string;

  /** 앨범 명 */
  readonly name: string;

  /** 앨범 소개 */
  readonly bio: string;

  /** 앨범 맴버 */
  readonly shareAlbumMemberList: ShareAlbumMember[];

  constructor(params: GetSharedAlbumQueryResult) {
    Object.assign(this, params);
  }
}
