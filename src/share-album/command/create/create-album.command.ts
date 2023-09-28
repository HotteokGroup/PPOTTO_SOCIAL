export class CreateShareAlbumCommand {
  /** 공유앨범 명 */
  readonly name: string;

  /** 공유앨범 소개 */
  readonly bio: string;

  /** 공유앨범 소유자 아이디 */
  readonly ownerId: number;

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
