export class CreateShareAlbumInviteCodeCommand {
  /** 초대코드를 생성할 앨범 아이디 */
  readonly albumId: string;

  constructor(params: CreateShareAlbumInviteCodeCommand) {
    Object.assign(this, params);
  }
}

export class CreateShareAlbumInviteCodeCommandResult {
  /** 생성된 초대 코드 */
  readonly inviteCode: string;

  constructor(params: CreateShareAlbumInviteCodeCommandResult) {
    Object.assign(this, params);
  }
}
