import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateFeedCommand, CreateFeedCommandResult } from './create-feed.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CreateFeedCommand)
export class CreateFeedHandler implements ICommandHandler<CreateFeedCommand, CreateFeedCommandResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateFeedCommand) {
    const { shareAlbumId, userId, description, contents } = command;

    // 앨범 및 유저 체크
    const shareAlbum = await this.prismaService.shareAlbum.findUnique({
      where: {
        id: shareAlbumId,
      },
      include: { shareAlbumMemberList: true },
    });
    if (!shareAlbum) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_NOT_FOUND);
    }
    const hasJoin = shareAlbum.shareAlbumMemberList.find((member) => member.userId === userId);
    if (!hasJoin) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_MEMBER_NOT_FOUND);
    }

    const feed = await this.prismaService.feed.create({
      data: {
        shareAlbumId,
        userId,
        description,
        contentList: {
          createMany: {
            data: contents.map((content) => ({
              userFileStoreId: content.userFileStoreId,
              type: content.type,
              contentLargeUrl: content.contentLargeUrl,
              contentMediumUrl: content.contentMediumUrl,
              contentSmallUrl: content.contentSmallUrl,
            })),
          },
        },
      },
    });

    return new CreateFeedCommandResult({
      feedId: feed.id,
    });
  }
}
