export class ModifyShareAlbumCommand {
  /** 공유앨범 아이디 */
  id: string;

  /** 공유앨범 명 */
  name?: string;

  /** 공유앨범 소개 */
  bio?: string;

  /** 썸네일 아이디 */
  thumbnailId?: string;

  /** 썸네일 URL */
  smallThumbnailUrl?: string;

  mediumThumbnailUrl?: string;

  largeThumbnailUrl?: string;

  constructor(params: ModifyShareAlbumCommand) {
    Object.assign(this, params);
  }
}

export class ModifyShareAlbumCommandResult {
  /** 공유앨범 아이디 */
  readonly id: string;

  constructor(params: ModifyShareAlbumCommandResult) {
    Object.assign(this, params);
  }
}
