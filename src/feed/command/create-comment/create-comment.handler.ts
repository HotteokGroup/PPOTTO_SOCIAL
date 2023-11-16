import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateFeedCommentCommand, CreateFeedCommentCommandResult } from './create-comment.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CreateFeedCommentCommand)
export class CreateFeedCommentHandler
  implements ICommandHandler<CreateFeedCommentCommand, CreateFeedCommentCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateFeedCommentCommand) {
    const { feedId, userId, description } = command;
    // 존재하는 피드인지 확인
    const feed = await this.prismaService.feed.findUnique({
      where: {
        id: feedId,
        deletedAt: null,
      },
    });
    if (!feed) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_FEED_NOT_FOUND);
    }

    // 가입한 멤버인지 확인
    const hasJoin = await this.prismaService.shareAlbumMember.findFirst({
      where: {
        shareAlbumId: feed.shareAlbumId,
        userId,
        deletedAt: null,
      },
    });
    if (!hasJoin) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_MEMBER_NOT_FOUND);
    }

    // 댓글 생성
    await this.prismaService.feedComment.create({
      data: {
        feedId,
        userId,
        description,
      },
    });

    return new CreateFeedCommentCommandResult({ feedId });
  }
}
