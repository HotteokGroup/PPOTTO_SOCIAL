import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetCollectionsQuery, GetCollectionsQueryResult } from './get-collections.query';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@QueryHandler(GetCollectionsQuery)
export class GetCollectionsHandler implements IQueryHandler<GetCollectionsQuery, GetCollectionsQueryResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetCollectionsQuery): Promise<GetCollectionsQueryResult> {
    const { userId, size, page } = query;
    const collections = await this.prismaService.collection.findMany({
      where: { userId, deletedAt: null },
      skip: size * page,
      take: size,
    });
    const total = await this.prismaService.collection.count({ where: { userId, deletedAt: null } });

    return new GetCollectionsQueryResult({ list: collections, total });
  }
}
