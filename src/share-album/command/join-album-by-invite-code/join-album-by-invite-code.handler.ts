import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  JoinShareAlbumByInviteCodeCommand,
  JoinShareAlbumByInviteCodeCommandResult,
} from './join-album-by-invite-code.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(JoinShareAlbumByInviteCodeCommand)
export class JoinShareAlbumByInviteCodeHandler
  implements ICommandHandler<JoinShareAlbumByInviteCodeCommand, JoinShareAlbumByInviteCodeCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: JoinShareAlbumByInviteCodeCommand): Promise<JoinShareAlbumByInviteCodeCommandResult> {
    const { userId } = command;
    // 초대코드에 해당하는 공유앨범을 찾습니다.
    // 초대코드가 존재하지 않거나, 비활성화된 경우 에러를 반환합니다.
    const inviteCodeInfo = await this.prismaService.shareAlbumInviteCode.findUnique({
      where: {
        code: command.inviteCode,
        deletedAt: null,
      },
    });
    if (!inviteCodeInfo) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_INVITE_CODE_NOT_FOUND);
    }

    // 이미 가입된 멤버인지 확인합니다.
    const isAlreadyJoined = await this.prismaService.shareAlbumMember.findFirst({
      where: {
        shareAlbumId: inviteCodeInfo.shareAlbumId,
        userId,
      },
    });
    if (isAlreadyJoined) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_MEMBER_ALREADY_JOINED);
    }

    // 해당 공유앨범에 임시 멤버로 추가합니다.
    try {
      await this.prismaService.shareAlbumMember.create({
        data: {
          shareAlbumId: inviteCodeInfo.shareAlbumId,
          userId,
          role: 'TEMPORARY',
          joinedAt: new Date(),
        },
      });
      return new JoinShareAlbumByInviteCodeCommandResult({ shareAlbumId: inviteCodeInfo.shareAlbumId });
    } catch (error) {
      throw new NotFoundException(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
  }
}
