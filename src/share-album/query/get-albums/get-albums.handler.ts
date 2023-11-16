import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetSharedAlbumsQuery, GetSharedAlbumsQueryResult } from './get-albums.query';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@QueryHandler(GetSharedAlbumsQuery)
export class GetSharedAlbumsHandler implements IQueryHandler<GetSharedAlbumsQuery, GetSharedAlbumsQueryResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetSharedAlbumsQuery): Promise<GetSharedAlbumsQueryResult> {
    const { userId } = query;

    const result = await this.prismaService.shareAlbum.findMany({
      where: {
        shareAlbumMemberList: {
          some: {
            userId,
            deletedAt: null,
          },
        },
      },
      include: { shareAlbumMemberList: true },
    });
    return new GetSharedAlbumsQueryResult({ list: result });
  }
}
