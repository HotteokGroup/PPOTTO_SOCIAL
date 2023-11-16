import { NotFoundException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetFeedQuery, GetFeedQueryResult } from './get-feed.query';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@QueryHandler(GetFeedQuery)
export class GetFeedHandler implements IQueryHandler<GetFeedQuery, GetFeedQueryResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetFeedQuery): Promise<GetFeedQueryResult> {
    const { feedId, shareAlbumId } = query;

    // 피드, 피드 콘텐츠, 피드 코멘트를 가져온다.
    const feed = await this.prismaService.feed.findFirst({
      where: { id: feedId, deletedAt: null, shareAlbumId },
      include: {
        contentList: {
          where: {
            deletedAt: null,
          },
        },
        commentList: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
    if (!feed) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_NOT_FOUND);
    }

    return new GetFeedQueryResult(feed);
  }
}
