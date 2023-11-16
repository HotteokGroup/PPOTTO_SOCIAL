import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteFeedsToCollectionCommand, DeleteFeedsToCollectionCommandResult } from './delete-feed.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(DeleteFeedsToCollectionCommand)
export class DeleteShareAlbumFeedToCollectionHandler
  implements ICommandHandler<DeleteFeedsToCollectionCommand, DeleteFeedsToCollectionCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeleteFeedsToCollectionCommand): Promise<DeleteFeedsToCollectionCommandResult> {
    const { collectionId, feedId } = command;

    // 존재하는 컬렉션 피드인지 확인
    const collectionFeed = await this.prismaService.feedsOnCollection.findFirst({
      where: {
        collectionId,
        feedId,
        deletedAt: null,
      },
    });
    if (!collectionFeed) {
      throw new NotFoundException(ERROR_CODE.COLLECTION_FEED_NOT_FOUND);
    }

    // 컬렉션 피드 삭제
    await this.prismaService.feedsOnCollection.update({
      where: {
        id: collectionFeed.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return new DeleteFeedsToCollectionCommandResult({ collectionId, feedId });
  }
}
