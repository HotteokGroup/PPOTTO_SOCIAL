import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  DeleteShareAlbumFeedCollectionCommand,
  DeleteShareAlbumFeedCollectionCommandResult,
} from './delete-collection.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(DeleteShareAlbumFeedCollectionCommand)
export class DeleteShareAlbumFeedCollectionHandler
  implements ICommandHandler<DeleteShareAlbumFeedCollectionCommand, DeleteShareAlbumFeedCollectionCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeleteShareAlbumFeedCollectionCommand): Promise<DeleteShareAlbumFeedCollectionCommandResult> {
    const { collectionId } = command;

    // 존재하는 컬렉션인지 확인
    const collection = await this.prismaService.feedCollection.findFirst({
      where: {
        id: collectionId,
      },
    });
    if (!collection) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_COLLECTION_NOT_FOUND);
    }

    // 컬렉션 삭제
    await this.prismaService.feedCollection.update({
      where: {
        id: collectionId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return new DeleteShareAlbumFeedCollectionCommandResult({ collectionId });
  }
}
