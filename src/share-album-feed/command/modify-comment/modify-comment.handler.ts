import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ModifyShareAlbumFeedCommentCommand, ModifyShareAlbumFeedCommentCommandResult } from './modify-comment.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(ModifyShareAlbumFeedCommentCommand)
export class ModifyShareAlbumFeedCommentHandler
  implements ICommandHandler<ModifyShareAlbumFeedCommentCommand, ModifyShareAlbumFeedCommentCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: ModifyShareAlbumFeedCommentCommand): Promise<ModifyShareAlbumFeedCommentCommandResult> {
    const { commentId, userId, feedId, description } = command;

    // 피드 코멘트 조회
    const feedComment = await this.prismaService.feedComment.findUnique({
      where: {
        id: commentId,
        userId,
        feedId,
        deletedAt: null,
      },
    });
    if (!feedComment) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_COMMENT_NOT_FOUND);
    }

    // 피드 코멘트 수정
    await this.prismaService.feedComment.update({
      where: {
        id: commentId,
      },
      data: {
        description,
      },
    });

    return new ModifyShareAlbumFeedCommentCommandResult({ feedId: feedComment.feedId });
  }
}
