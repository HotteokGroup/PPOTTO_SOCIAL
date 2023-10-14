import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LeaveShareAlbumCommand, LeaveShareAlbumCommandResult } from './leave-album.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(LeaveShareAlbumCommand)
export class LeaveShareAlbumHandler implements ICommandHandler<LeaveShareAlbumCommand, LeaveShareAlbumCommandResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: LeaveShareAlbumCommand): Promise<LeaveShareAlbumCommandResult> {
    const { albumId, userId } = command;

    // 실제로 앨범에 등록된 멤버인지 확인합니다
    const memberExist = await this.prismaService.shareAlbumMember.findFirst({
      where: {
        shareAlbumId: albumId,
        userId,
        deletedAt: null,
      },
    });
    if (!memberExist) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_MEMBER_NOT_FOUND);
    }

    // 멤버를 삭제합니다.
    await this.prismaService.shareAlbumMember.update({
      where: {
        shareAlbumId: albumId,
        id: memberExist.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return new LeaveShareAlbumCommandResult({ albumId });
  }
}
