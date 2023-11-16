import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddFeedsToCollectionCommand, AddFeedsToCollectionCommandResult } from './add-feed.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(AddFeedsToCollectionCommand)
export class AddFeedsToCollectionHandler
  implements ICommandHandler<AddFeedsToCollectionCommand, AddFeedsToCollectionCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: AddFeedsToCollectionCommand): Promise<AddFeedsToCollectionCommandResult> {
    const { collectionId, feedId } = command;

    // 존재하는 컬렉션인지 확인
    const collection = await this.prismaService.collection.findUnique({
      where: { id: collectionId, deletedAt: null },
    });
    if (!collection) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_COLLECTION_NOT_FOUND);
    }
    // 존재하는 피드인지 확인
    const feed = await this.prismaService.feed.findUnique({
      where: { id: feedId, deletedAt: null },
    });
    if (!feed) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_NOT_FOUND);
    }

    // 컬렉션 추가
    const result = await this.prismaService.feedsOnCollection.create({
      data: {
        collectionId,
        feedId,
      },
    });
    return new AddFeedsToCollectionCommandResult({ collectionId: result.id });
  }
}
