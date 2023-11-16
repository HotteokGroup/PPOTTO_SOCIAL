import { FeedContentType } from '@prisma/client';

export class CreateFeedCommand {
  /** 공유 앨범 아이디 */
  shareAlbumId: string;

  /** 유저 아이디 */
  userId: number;

  /** 피드 내용 */
  description?: string;

  /** 피드 콘텐츠 */
  contents: {
    /** 콘텐츠 아이디 */
    contentId: string;

    /** 콘텐츠 타입 */
    type: FeedContentType;

    /** 콘텐츠 URL */
    contentSmallUrl?: string;
    contentMediumUrl?: string;
    contentLargeUrl?: string;
  }[];

  constructor(params: CreateFeedCommand) {
    Object.assign(this, params);
  }
}

export class CreateFeedCommandResult {
  /** 피드 아이디 */
  feedId: string;

  constructor(params: Required<CreateFeedCommandResult>) {
    Object.assign(this, params);
  }
}
