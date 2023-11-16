import { FeedContentType } from '@prisma/client';

export class GetCollectionFeedsQuery {
  /** 컬렉션 아이디 */
  collectionId: string;

  /** 페이지 사이즈 */
  size: number;

  /** 페이지 번호 zero-base */
  page: number;

  constructor(params: GetCollectionFeedsQuery) {
    Object.assign(this, params);
  }
}

export class GetCollectionFeedsQueryResult {
  /** 토탈 카운트 */
  total: number;

  /** 피드 리스트 */
  list: {
    /** 피드 아이디 */
    id: string;

    /** 유저 아아디 */
    userId: number;

    /** 피드 내용 */
    description: string;

    /** 피드 콘텐츠 */
    contentList: {
      /** 피드 아이디 */
      id: string;
      /** 피드 타입 */
      type: FeedContentType;
      /** 피드 콘텐츠 URL */
      contentSmallUrl: string;
      contentMediumUrl: string;
      contentLargeUrl: string;
      createdAt: Date;
    }[];

    /** 생성일 */
    createdAt: Date;

    /** 수정일 */
    updatedAt: Date;
  }[];

  constructor(params: GetCollectionFeedsQueryResult) {
    Object.assign(this, params);
  }
}
