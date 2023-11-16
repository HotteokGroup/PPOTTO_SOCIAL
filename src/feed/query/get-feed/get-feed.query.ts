import { FeedContentType } from '@prisma/client';

export class GetFeedQuery {
  /** 공유 앨범 아이디 */
  shareAlbumId: string;

  /** 피드 아이디 */
  feedId: string;

  constructor(params: GetFeedQuery) {
    Object.assign(this, params);
  }
}

export class GetFeedQueryResult {
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
  }[];

  /** 피드 코멘트 */
  commentList: {
    id: string;
    userId: number;
    description: string;
    createdAt: Date;
  }[];

  /** 생성일 */
  createdAt: Date;

  /** 수정일 */
  updatedAt: Date;

  constructor(params: GetFeedQueryResult) {
    Object.assign(this, params);
  }
}
