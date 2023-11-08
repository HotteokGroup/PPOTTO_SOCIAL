export class ModifyShareAlbumFeedCommentCommand {
  /** 댓글 아이디 */
  commentId: string;

  /** 피드 아이디 */
  feedId: string;

  /** 유저 아이디 */
  userId: number;

  /** 댓글 내용 */
  description: string;

  constructor(params: ModifyShareAlbumFeedCommentCommand) {
    Object.assign(this, params);
  }
}

export class ModifyShareAlbumFeedCommentCommandResult {
  /** 피드 아이디 */
  feedId: string;

  constructor(params: Required<ModifyShareAlbumFeedCommentCommandResult>) {
    Object.assign(this, params);
  }
}
