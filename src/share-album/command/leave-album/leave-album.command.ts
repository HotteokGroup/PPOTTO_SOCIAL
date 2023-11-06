export class LeaveShareAlbumCommand {
  /** 탈퇴할 그룹 아이디 */
  readonly albumId: string;

  /** 고객 아이디 */
  readonly userId: number;

  constructor(params: LeaveShareAlbumCommand) {
    Object.assign(this, params);
  }
}

export class LeaveShareAlbumCommandResult {
  /** 탈퇴한 그룹 아이디 */
  readonly albumId: string;

  constructor(params: LeaveShareAlbumCommandResult) {
    Object.assign(this, params);
  }
}
