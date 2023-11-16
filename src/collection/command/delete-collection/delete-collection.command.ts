export class DeleteCollectionCommand {
  /** 컬렉션 아이디 */
  collectionId: string;

  constructor(params: DeleteCollectionCommand) {
    Object.assign(this, params);
  }
}

export class DeleteCollectionCommandResult {
  /** 삭제된 컬렉션 아이디 */
  collectionId: string;

  constructor(params: DeleteCollectionCommandResult) {
    Object.assign(this, params);
  }
}
