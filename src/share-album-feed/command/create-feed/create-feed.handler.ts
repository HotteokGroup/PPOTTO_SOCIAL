import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateShareAlbumFeedCommand, CreateShareAlbumFeedCommandResult } from './create-feed.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CreateShareAlbumFeedCommand)
export class CreateShareAlbumFeedHandler
  implements ICommandHandler<CreateShareAlbumFeedCommand, CreateShareAlbumFeedCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateShareAlbumFeedCommand) {
    const { shareAlbumId, userId, description, contents } = command;

    // 앨범 및 유저 체크
    const shareAlbum = await this.prismaService.shareAlbum.findUnique({
      where: {
        id: shareAlbumId,
      },
      include: { shareAlbumMember: true },
    });
    if (!shareAlbum) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_NOT_FOUND);
    }
    const hasJoin = shareAlbum.shareAlbumMember.find((member) => member.userId === userId);
    if (!hasJoin) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_MEMBER_NOT_FOUND);
    }

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
