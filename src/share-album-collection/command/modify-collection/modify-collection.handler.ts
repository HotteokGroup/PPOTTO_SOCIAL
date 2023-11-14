import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ModifyShareAlbumFeedCollectionCommand,
  ModifyShareAlbumFeedCollectionCommandResult,
} from './modify-collection.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(ModifyShareAlbumFeedCollectionCommand)
export class ModifyShareAlbumFeedCollectionHandler
  implements ICommandHandler<ModifyShareAlbumFeedCollectionCommand, ModifyShareAlbumFeedCollectionCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: ModifyShareAlbumFeedCollectionCommand): Promise<ModifyShareAlbumFeedCollectionCommandResult> {
    const { collectionId, name, description } = command;
    // 존재하는 컬렉션인지 확인
    const collection = await this.prismaService.feedCollection.findFirst({
      where: {
        id: collectionId,
      },
    });
    if (!collection) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_COLLECTION_NOT_FOUND);
    }

    // 컬렉션 수정
    await this.prismaService.feedCollection.update({
      where: {
        id: collectionId,
      },
      data: {
        ...(name && { name }),
        ...(description && { description }),
      },
    });
    return new ModifyShareAlbumFeedCollectionCommandResult({ collectionId });
  }
}
