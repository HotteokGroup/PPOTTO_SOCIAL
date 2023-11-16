import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetCollectionFeedsQuery, GetCollectionFeedsQueryResult } from './get-collection-feeds.query';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@QueryHandler(GetCollectionFeedsQuery)
export class GetCollectionFeedsHandler
  implements IQueryHandler<GetCollectionFeedsQuery, GetCollectionFeedsQueryResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetCollectionFeedsQuery): Promise<GetCollectionFeedsQueryResult> {
    const { collectionId, size, page } = query;
    const feedsOnCollection = await this.prismaService.feedsOnCollection.findMany({
      include: {
        feed: {
          include: {
            contentList: {
              where: {
                deletedAt: null,
              },
            },
          },
        },
      },
      where: {
        collectionId,
        deletedAt: null,
        feed: {
          deletedAt: null,
        },
      },
      skip: size * page,
      take: size,
    });
    const feeds = feedsOnCollection.map((feedOnCollection) => feedOnCollection.feed);
    const total = await this.prismaService.feedsOnCollection.count({
      where: {
        collectionId,
        deletedAt: null,
        feed: {
          deletedAt: null,
        },
      },
    });

    return new GetCollectionFeedsQueryResult({ list: feeds, total });
  }
}
