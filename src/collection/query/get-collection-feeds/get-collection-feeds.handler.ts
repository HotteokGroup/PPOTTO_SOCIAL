import { NotFoundException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetCollectionFeedsQuery, GetCollectionFeedsQueryResult } from './get-collection-feeds.query';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@QueryHandler(GetCollectionFeedsQuery)
export class GetCollectionFeedsHandler
  implements IQueryHandler<GetCollectionFeedsQuery, GetCollectionFeedsQueryResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetCollectionFeedsQuery): Promise<GetCollectionFeedsQueryResult> {
    const { collectionId, size, page } = query;

    // 컬렉션이 존재하는지 검증
    const collection = await this.prismaService.collection.findUnique({
      where: {
        id: collectionId,
        deletedAt: null,
      },
    });
    if (!collection) {
      throw new NotFoundException(ERROR_CODE.COLLECTION_NOT_FOUND);
    }

    // 컬렉션에 연관된 피드 리스트 및 콘텐츠 조회
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
