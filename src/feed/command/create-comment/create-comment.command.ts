export class CreateFeedCommentCommand {
  /** 피드 아이디 */
  feedId: string;

  /** 유저 아이디 */
  userId: number;

  /** 댓글 내용 */
  description: string;

  constructor(params: CreateFeedCommentCommand) {
    Object.assign(this, params);
  }
}

export class CreateFeedCommentCommandResult {
  /** 피드 아이디 */
  feedId: string;

  constructor(params: Required<CreateFeedCommentCommandResult>) {
    Object.assign(this, params);
  }
}
