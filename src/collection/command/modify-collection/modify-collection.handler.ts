import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ModifyCollectionCommand, ModifyCollectionCommandResult } from './modify-collection.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(ModifyCollectionCommand)
export class ModifyCollectionHandler
  implements ICommandHandler<ModifyCollectionCommand, ModifyCollectionCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: ModifyCollectionCommand): Promise<ModifyCollectionCommandResult> {
    const { collectionId, name, description } = command;
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

    // 컬렉션 수정
    await this.prismaService.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        ...(name && { name }),
        ...(description && { description }),
      },
    });
    return new ModifyCollectionCommandResult({ collectionId });
  }
}
