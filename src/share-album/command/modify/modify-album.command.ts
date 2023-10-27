export class ModifyShareAlbumCommand {
  /** 공유앨범 아이디 */
  readonly id: string;

  /** 공유앨범 명 */
  readonly name: string;

  /** 공유앨범 소개 */
  readonly bio: string;

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
