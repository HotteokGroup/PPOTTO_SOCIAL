import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  DeleteShareAlbumFeedToCollectionCommand,
  DeleteShareAlbumFeedToCollectionCommandResult,
} from './delete-feed.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(DeleteShareAlbumFeedToCollectionCommand)
export class DeleteShareAlbumFeedToCollectionHandler
  implements ICommandHandler<DeleteShareAlbumFeedToCollectionCommand, DeleteShareAlbumFeedToCollectionCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    command: DeleteShareAlbumFeedToCollectionCommand,
  ): Promise<DeleteShareAlbumFeedToCollectionCommandResult> {
    const { collectionId, feedId } = command;

    // 존재하는 컬렉션 피드인지 확인
    const collectionFeed = await this.prismaService.feedContentsOnCollection.findFirst({
      where: {
        feedCollectionId: collectionId,
        shareAlbumFeedId: feedId,
        deletedAt: null,
      },
    });
    if (!collectionFeed) {
      throw new NotFoundException(ERROR_CODE.COLLECTION_FEED_NOT_FOUND);
    }

    // 컬렉션 피드 삭제
    await this.prismaService.feedContentsOnCollection.update({
      where: {
        id: collectionFeed.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return new DeleteShareAlbumFeedToCollectionCommandResult({ collectionId, feedId });
  }
}
