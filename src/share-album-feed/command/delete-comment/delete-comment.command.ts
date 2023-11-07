export class DeleteShareAlbumFeedCommentCommand {
  /** 댓글 아이디 */
  commentId: string;

  /** 피드 아이디 */
  feedId: string;

  /** 유저 아이디 */
  userId: number;

  constructor(params: DeleteShareAlbumFeedCommentCommand) {
    Object.assign(this, params);
  }
}

export class DeleteShareAlbumFeedCommentCommandResult {
  /** 피드 아이디 */
  feedId: string;

  constructor(params: DeleteShareAlbumFeedCommentCommandResult) {
    Object.assign(this, params);
  }
}
