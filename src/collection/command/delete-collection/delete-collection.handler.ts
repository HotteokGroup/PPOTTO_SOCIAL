import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteCollectionCommand, DeleteCollectionCommandResult } from './delete-collection.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(DeleteCollectionCommand)
export class DeleteCollectionHandler
  implements ICommandHandler<DeleteCollectionCommand, DeleteCollectionCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeleteCollectionCommand): Promise<DeleteCollectionCommandResult> {
    const { collectionId } = command;

    // 존재하는 컬렉션인지 확인
    const collection = await this.prismaService.collection.findFirst({
      where: {
        id: collectionId,
        deletedAt: null,
      },
    });
    if (!collection) {
      throw new NotFoundException(ERROR_CODE.COLLECTION_NOT_FOUND);
    }

    // 컬렉션 삭제
    await this.prismaService.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return new DeleteCollectionCommandResult({ collectionId });
  }
}
