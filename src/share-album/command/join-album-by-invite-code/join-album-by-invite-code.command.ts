export class JoinShareAlbumByInviteCodeCommand {
  /** 대상 유저 아이디 */
  readonly userId: number;

  /** 초대코드 */
  readonly inviteCode: string;

  constructor(props: JoinShareAlbumByInviteCodeCommand) {
    Object.assign(this, props);
  }
}

export class JoinShareAlbumByInviteCodeCommandResult {
  /** 가입된 공유앨범 아이디 */
  readonly shareAlbumId: string;

  constructor(props: JoinShareAlbumByInviteCodeCommandResult) {
    Object.assign(this, props);
  }
}
