import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetFeedQuery, GetFeedQueryResult } from './get-feed.query';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@QueryHandler(GetFeedQuery)
export class GetFeedHandler implements IQueryHandler<GetFeedQuery, GetFeedQueryResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetFeedQuery): Promise<GetFeedQueryResult> {
    const { feedId } = query;

    // 피드, 피드 콘텐츠, 피드 코멘트를 가져온다.
    const feed = await this.prismaService.shareAlbumFeed.findFirst({
      where: { id: feedId, deletedAt: null },
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

    return new GetFeedQueryResult(feed);
  }
}
