import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateShareAlbumFeedCommand, CreateShareAlbumFeedCommandResult } from './create-feed.command';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CreateShareAlbumFeedCommand)
export class CreateShareAlbumFeedHandler
  implements ICommandHandler<CreateShareAlbumFeedCommand, CreateShareAlbumFeedCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateShareAlbumFeedCommand) {
    const { shareAlbumId, userId, description, contents } = command;

    const feed = await this.prismaService.shareAlbumFeed.create({
      data: {
        shareAlbumId,
        userId,
        description,
        FeedContent: {
          createMany: {
            data: contents.map((content) => ({
              contentId: content.contentId,
              type: content.type,
              contentLargeUrl: content.contentLargeUrl,
              contentMediumUrl: content.contentMediumUrl,
              contentSmallUrl: content.contentSmallUrl,
            })),
          },
        },
      },
    });

    return new CreateShareAlbumFeedCommandResult({
      feedId: feed.id,
    });
  }
}
