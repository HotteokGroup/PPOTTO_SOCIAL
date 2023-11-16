import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetSharedAlbumQuery, GetSharedAlbumQueryResult } from './get-album.query';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@QueryHandler(GetSharedAlbumQuery)
export class GetSharedAlbumHandler implements IQueryHandler<GetSharedAlbumQuery, GetSharedAlbumQueryResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetSharedAlbumQuery): Promise<GetSharedAlbumQueryResult> {
    const { id } = query;

    const album = await this.prismaService.shareAlbum.findUnique({
      where: { id },
      include: { shareAlbumMemberList: true },
    });
    if (!album) throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_NOT_FOUND);

    return new GetSharedAlbumQueryResult(album);
  }
}
