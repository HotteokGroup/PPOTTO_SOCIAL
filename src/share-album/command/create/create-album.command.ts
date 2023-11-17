export class CreateShareAlbumCommand {
  /** 공유앨범 명 */
  name: string;

  /** 공유앨범 소개 */
  bio?: string;

  /** 공유앨범 소유자 아이디 */
  ownerId: number;

  /** 썸네일 아이디 */
  thumbnailId?: string;

  /** 썸네일 URL */
  smallThumbnailUrl?: string;

  mediumThumbnailUrl?: string;

  largeThumbnailUrl?: string;

  // TODO: 공유앨범 썸네일 등록처리 기능 추가필요
  constructor(params: CreateShareAlbumCommand) {
    Object.assign(this, params);
  }
}

export class CreateShareAlbumCommandResult {
  /** 공유앨범 아이디 */
  readonly id: string;

  constructor(params: CreateShareAlbumCommandResult) {
    Object.assign(this, params);
  }
}
