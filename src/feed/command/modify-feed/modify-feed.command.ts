import { FeedContentType } from '@prisma/client';

export class ModifyFeedCommand {
  /** 피드 아이디 */
  feedId: string;

  /** 공유 앨범 아이디 */
  shareAlbumId: string;

  /** 피드 내용 */
  description?: string;

  /** 피드 콘텐츠 */
  contents?: {
    /** 콘텐츠 아이디 */
    contentId: string;

    /** 콘텐츠 타입 */
    type: FeedContentType;

    /** 콘텐츠 URL */
    contentSmallUrl?: string;
    contentMediumUrl?: string;
    contentLargeUrl?: string;
  }[];

  constructor(params: ModifyFeedCommand) {
    Object.assign(this, params);
  }
}
