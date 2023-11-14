import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddShareAlbumFeedToCollectionCommand, AddShareAlbumFeedToCollectionCommandResult } from './add-feed.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(AddShareAlbumFeedToCollectionCommand)
export class AddShareAlbumFeedToCollectionHandler
  implements ICommandHandler<AddShareAlbumFeedToCollectionCommand, AddShareAlbumFeedToCollectionCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: AddShareAlbumFeedToCollectionCommand): Promise<AddShareAlbumFeedToCollectionCommandResult> {
    const { collectionId, feedId } = command;

    // 존재하는 컬렉션인지 확인
    const collection = await this.prismaService.feedCollection.findUnique({
      where: { id: collectionId, deletedAt: null },
    });
    if (!collection) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_COLLECTION_NOT_FOUND);
    }
    // 존재하는 피드인지 확인
    const feed = await this.prismaService.shareAlbumFeed.findUnique({
      where: { id: feedId, deletedAt: null },
    });
    if (!feed) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_NOT_FOUND);
    }

    // 컬렉션 추가
    const result = await this.prismaService.feedCollection.update({
      where: { id: collectionId },
      data: {
        Feeds: {
          create: {
            shareAlbumFeedId: feedId,
          },
        },
      },
    });
    return new AddShareAlbumFeedToCollectionCommandResult({ collectionId: result.id });
  }
}
