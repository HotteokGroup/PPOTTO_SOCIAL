import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetFeedListQuery, GetFeedListQueryResult } from './get-feed-list.query';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@QueryHandler(GetFeedListQuery)
export class GetFeedListHandler implements IQueryHandler<GetFeedListQuery, GetFeedListQueryResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetFeedListQuery): Promise<GetFeedListQueryResult> {
    const { shareAlbumId, size, page } = query;

    // 피드와 피드 콘텐츠를 가져온다.
    const feeds = await this.prismaService.shareAlbumFeed.findMany({
      where: { shareAlbumId, deletedAt: null },
      include: { FeedContent: { where: { deletedAt: null } } },
      skip: size * page,
      take: size,
    });
    // 카운트를 가져온다.
    const total = await this.prismaService.shareAlbumFeed.count({ where: { shareAlbumId, deletedAt: null } });

    return new GetFeedListQueryResult({ list: feeds, total });
  }
}
