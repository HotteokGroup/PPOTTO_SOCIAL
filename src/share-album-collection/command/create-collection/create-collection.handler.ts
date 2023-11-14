import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  CreateShareAlbumFeedCollectionCommand,
  CreateShareAlbumFeedCollectionCommandResult,
} from './create-collection.command';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CreateShareAlbumFeedCollectionCommand)
export class CreateShareAlbumFeedCollectionHandler
  implements ICommandHandler<CreateShareAlbumFeedCollectionCommand, CreateShareAlbumFeedCollectionCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateShareAlbumFeedCollectionCommand): Promise<CreateShareAlbumFeedCollectionCommandResult> {
    const { userId, name, description } = command;

    const collection = await this.prismaService.feedCollection.create({
      data: {
        userId,
        name,
        description,
      },
    });

    return new CreateShareAlbumFeedCollectionCommandResult({ collectionId: collection.id });
  }
}
