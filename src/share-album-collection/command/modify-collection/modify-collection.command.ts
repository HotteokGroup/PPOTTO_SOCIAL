export class ModifyShareAlbumFeedCollectionCommand {
  /** 컬렉션 아이디 */
  collectionId: string;

  /** 컬렉션 이름 */
  name?: string;

  /** 컬렉션 설명 */
  description?: string;

  constructor(params: ModifyShareAlbumFeedCollectionCommand) {
    Object.assign(this, params);
  }
}

export class ModifyShareAlbumFeedCollectionCommandResult {
  /** 컬렉션 아이디 */
  collectionId: string;

  constructor(params: ModifyShareAlbumFeedCollectionCommandResult) {
    Object.assign(this, params);
  }
}
