export class CreateCollectionCommand {
  /** 회원 아이디 */
  userId: number;

  /** 컬렉션명 */
  name: string;

  /** 컬렉션 설명 */
  description?: string;

  constructor(params: CreateCollectionCommand) {
    Object.assign(this, params);
  }
}

export class CreateCollectionCommandResult {
  /** 컬렉션 아이디 */
  collectionId: string;

  constructor(params: CreateCollectionCommandResult) {
    Object.assign(this, params);
  }
}
