export class DeleteFeedCommentCommand {
  /** 댓글 아이디 */
  commentId: string;

  /** 피드 아이디 */
  feedId: string;

  /** 유저 아이디 */
  userId: number;

  constructor(params: DeleteFeedCommentCommand) {
    Object.assign(this, params);
  }
}

export class DeleteFeedCommentCommandResult {
  /** 피드 아이디 */
  feedId: string;

  constructor(params: DeleteFeedCommentCommandResult) {
    Object.assign(this, params);
  }
}
