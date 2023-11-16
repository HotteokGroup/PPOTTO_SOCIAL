import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateCollectionCommand, CreateCollectionCommandResult } from './create-collection.command';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CreateCollectionCommand)
export class CreateCollectionHandler
  implements ICommandHandler<CreateCollectionCommand, CreateCollectionCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateCollectionCommand): Promise<CreateCollectionCommandResult> {
    const { userId, name, description } = command;

    const collection = await this.prismaService.collection.create({
      data: {
        userId,
        name,
        description,
      },
    });

    return new CreateCollectionCommandResult({ collectionId: collection.id });
  }
}
