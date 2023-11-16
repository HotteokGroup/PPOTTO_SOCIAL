export class ModifyFeedCommentCommand {
  /** 댓글 아이디 */
  commentId: string;

  /** 피드 아이디 */
  feedId: string;

  /** 유저 아이디 */
  userId: number;

  /** 댓글 내용 */
  description: string;

  constructor(params: ModifyFeedCommentCommand) {
    Object.assign(this, params);
  }
}

export class ModifyFeedCommentCommandResult {
  /** 피드 아이디 */
  feedId: string;

  constructor(params: Required<ModifyFeedCommentCommandResult>) {
    Object.assign(this, params);
  }
}
