export class CreateShareAlbumFeedCollectionCommand {
  /** 회원 아이디 */
  userId: number;

  /** 컬렉션명 */
  name: string;

  /** 컬렉션 설명 */
  description?: string;

  constructor(params: CreateShareAlbumFeedCollectionCommand) {
    Object.assign(this, params);
  }
}

export class CreateShareAlbumFeedCollectionCommandResult {
  /** 컬렉션 아이디 */
  id: string;

  constructor(params: CreateShareAlbumFeedCollectionCommandResult) {
    Object.assign(this, params);
  }
}
