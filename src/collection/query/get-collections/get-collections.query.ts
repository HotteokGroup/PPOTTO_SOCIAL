export class GetCollectionsQuery {
  /** 고객 아이디 */
  userId: number;

  /** 페이지 사이즈 */
  size: number;

  /** 페이지 번호 zero-base */
  page: number;

  constructor(params: GetCollectionsQuery) {
    Object.assign(this, params);
  }
}

export class GetCollectionsQueryResult {
  /** 토탈 카운트 */
  total: number;

  /** 컬렉션 리스트 */
  list: {
    /** 컬렉션 아이디 */
    id: string;

    /** 컬렉션 이름 */
    name: string;

    /** 컬렉션 설명 */
    description?: string;

    /** 컬렉션 생성일 */
    createdAt: Date;

    /** 컬렉션 수정일 */
    updatedAt: Date;

    /** 컬렉션 삭제일 */
    deletedAt: Date;
  }[];

  constructor(params: GetCollectionsQueryResult) {
    Object.assign(this, params);
  }
}
