export class CreateShareAlbumFeedCommentCommand {
  /** 피드 아이디 */
  feedId: string;

  /** 유저 아이디 */
  userId: number;

  /** 댓글 내용 */
  description: string;

  constructor(params: CreateShareAlbumFeedCommentCommand) {
    Object.assign(this, params);
  }
}

export class CreateShareAlbumFeedCommentCommandResult {
  /** 피드 아이디 */
  feedId: string;

  constructor(params: Required<CreateShareAlbumFeedCommentCommandResult>) {
    Object.assign(this, params);
  }
}
