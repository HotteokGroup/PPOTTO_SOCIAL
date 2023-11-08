import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ModifyShareAlbumFeedCommand } from './modify-feed.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(ModifyShareAlbumFeedCommand)
export class ModifyShareAlbumFeedHandler implements ICommandHandler<ModifyShareAlbumFeedCommand, boolean> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: ModifyShareAlbumFeedCommand) {
    const { feedId: id, shareAlbumId, description, contents } = command;

    // 피드 존재 여부 확인
    const feed = await this.prismaService.shareAlbumFeed.findUnique({
      where: {
        id,
      },
    });
    if (!feed || feed.deletedAt) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_NOT_FOUND);
    }
    // 피드 소유 앨범 아이디가 다를 경우
    if (feed.shareAlbumId !== shareAlbumId) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_NOT_FOUND);
    }

    // 피드 내용 수정
    await this.prismaService.shareAlbumFeed.update({
      where: {
        id,
        shareAlbumId,
      },
      data: {
        description,
        ...(contents && {
          FeedContent: {
            updateMany: {
              where: {
                feedId: id,
              },
              data: {
                deletedAt: new Date(),
              },
            },
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
        }),
      },
    });
    return true;
  }
}
