export class DeleteShareAlbumFeedToCollectionCommand {
  /** 컬렉션 아이디 */
  collectionId: string;

  /** 피드 아이디 */
  feedId: string;

  constructor(params: DeleteShareAlbumFeedToCollectionCommand) {
    Object.assign(this, params);
  }
}

export class DeleteShareAlbumFeedToCollectionCommandResult {
  /** 컬렉션 아이디 */
  collectionId: string;

  /** 피드 아이디 */
  feedId: string;

  constructor(params: DeleteShareAlbumFeedToCollectionCommandResult) {
    Object.assign(this, params);
  }
}
