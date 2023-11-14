export class AddShareAlbumFeedToCollectionCommand {
  /** 컬렉션 아이디 */
  collectionId: string;

  /** 피드 아이디 */
  feedId: string;

  constructor(params: AddShareAlbumFeedToCollectionCommand) {
    Object.assign(this, params);
  }
}

export class AddShareAlbumFeedToCollectionCommandResult {
  /** 컬렉션 아이디 */
  collectionId: string;

  constructor(params: AddShareAlbumFeedToCollectionCommandResult) {
    Object.assign(this, params);
  }
}
