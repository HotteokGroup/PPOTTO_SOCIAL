export class ModifyCollectionCommand {
  /** 컬렉션 아이디 */
  collectionId: string;

  /** 컬렉션 이름 */
  name?: string;

  /** 컬렉션 설명 */
  description?: string;

  constructor(params: ModifyCollectionCommand) {
    Object.assign(this, params);
  }
}

export class ModifyCollectionCommandResult {
  /** 컬렉션 아이디 */
  collectionId: string;

  constructor(params: ModifyCollectionCommandResult) {
    Object.assign(this, params);
  }
}
