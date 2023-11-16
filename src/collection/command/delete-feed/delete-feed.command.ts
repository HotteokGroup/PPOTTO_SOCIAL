export class DeleteFeedsToCollectionCommand {
  /** 컬렉션 아이디 */
  collectionId: string;

  /** 피드 아이디 */
  feedId: string;

  constructor(params: DeleteFeedsToCollectionCommand) {
    Object.assign(this, params);
  }
}

export class DeleteFeedsToCollectionCommandResult {
  /** 컬렉션 아이디 */
  collectionId: string;

  /** 피드 아이디 */
  feedId: string;

  constructor(params: DeleteFeedsToCollectionCommandResult) {
    Object.assign(this, params);
  }
}
