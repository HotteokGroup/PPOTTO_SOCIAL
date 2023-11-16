export class AddFeedsToCollectionCommand {
  /** 컬렉션 아이디 */
  collectionId: string;

  /** 피드 아이디 */
  feedId: string;

  constructor(params: AddFeedsToCollectionCommand) {
    Object.assign(this, params);
  }
}

export class AddFeedsToCollectionCommandResult {
  /** 컬렉션 아이디 */
  collectionId: string;

  constructor(params: AddFeedsToCollectionCommandResult) {
    Object.assign(this, params);
  }
}
