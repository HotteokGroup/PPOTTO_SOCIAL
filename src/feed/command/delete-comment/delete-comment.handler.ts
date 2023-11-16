import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteFeedCommentCommand, DeleteFeedCommentCommandResult } from './delete-comment.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(DeleteFeedCommentCommand)
export class DeleteFeedCommentHandler
  implements ICommandHandler<DeleteFeedCommentCommand, DeleteFeedCommentCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeleteFeedCommentCommand): Promise<DeleteFeedCommentCommandResult> {
    const { commentId, userId, feedId } = command;

    // 댓글이 있는지 확인
    const comment = await this.prismaService.feedComment.findUnique({
      where: {
        id: commentId,
        feedId,
        userId,
        deletedAt: null,
      },
    });
    if (!comment) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_COMMENT_NOT_FOUND);
    }

    // 댓글 삭제
    await this.prismaService.feedComment.update({
      where: {
        id: commentId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return new DeleteFeedCommentCommandResult({ feedId: comment.feedId });
  }
}
