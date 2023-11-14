export class DeleteShareAlbumFeedCollectionCommand {
  /** 컬렉션 아이디 */
  collectionId: string;

  constructor(params: DeleteShareAlbumFeedCollectionCommand) {
    Object.assign(this, params);
  }
}

export class DeleteShareAlbumFeedCollectionCommandResult {
  /** 삭제된 컬렉션 아이디 */
  collectionId: string;

  constructor(params: DeleteShareAlbumFeedCollectionCommandResult) {
    Object.assign(this, params);
  }
}
