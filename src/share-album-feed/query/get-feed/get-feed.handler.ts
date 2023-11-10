import { NotFoundException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetShareAlbumFeedQuery, GetShareAlbumFeedQueryResult } from './get-feed.query';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@QueryHandler(GetShareAlbumFeedQuery)
export class GetShareAlbumFeedHandler implements IQueryHandler<GetShareAlbumFeedQuery, GetShareAlbumFeedQueryResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetShareAlbumFeedQuery): Promise<GetShareAlbumFeedQueryResult> {
    const { feedId, shareAlbumId } = query;

    // 피드, 피드 콘텐츠, 피드 코멘트를 가져온다.
    const feed = await this.prismaService.shareAlbumFeed.findFirst({
      where: { id: feedId, deletedAt: null, shareAlbumId },
      include: {
        FeedContent: {
          where: {
            deletedAt: null,
          },
        },
        FeedComment: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
    if (!feed) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_NOT_FOUND);
    }

    return new GetShareAlbumFeedQueryResult(feed);
  }
}
