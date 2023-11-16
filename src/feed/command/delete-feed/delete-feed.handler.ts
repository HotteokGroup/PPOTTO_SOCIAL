import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteFeedCommand } from './delete-feed.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(DeleteFeedCommand)
export class DeleteFeedHandler implements ICommandHandler<DeleteFeedCommand, boolean> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeleteFeedCommand) {
    const { feedId: id, shareAlbumId } = command;

    // 피드 존재 여부 확인
    const feed = await this.prismaService.feed.findUnique({
      where: {
        id,
      },
    });
    // 피드가 존재하지 않거나 삭제되었을 경우
    if (!feed || feed.deletedAt) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_NOT_FOUND);
    }
    // 피드 소유 앨범 아이디가 다를 경우
    if (feed.shareAlbumId !== shareAlbumId) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_NOT_FOUND);
    }

    // 피드 및 피드 콘텐츠 소프트 딜리트
    await this.prismaService.feed.update({
      where: {
        id,
        shareAlbumId,
      },
      data: {
        deletedAt: new Date(),
        contentList: {
          updateMany: {
            where: {
              feedId: id,
            },
            data: {
              deletedAt: new Date(),
            },
          },
        },
      },
    });

    return true;
  }
}
