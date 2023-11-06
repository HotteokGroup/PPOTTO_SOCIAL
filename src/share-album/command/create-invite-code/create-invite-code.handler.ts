import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  CreateShareAlbumInviteCodeCommand,
  CreateShareAlbumInviteCodeCommandResult,
} from './create-invite-code.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CreateShareAlbumInviteCodeCommand)
export class CreateShareAlbumInviteCodeHandler
  implements ICommandHandler<CreateShareAlbumInviteCodeCommand, CreateShareAlbumInviteCodeCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateShareAlbumInviteCodeCommand): Promise<CreateShareAlbumInviteCodeCommandResult> {
    const { albumId } = command;
    // 존재하는 앨범인지 확인하고, 없으면 에러를 반환합니다.
    const album = await this.prismaService.shareAlbum.findUnique({
      where: {
        id: albumId,
      },
    });
    if (!album) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_NOT_FOUND);
    }

    // 이전에 발행된 초대코드를 모두 비활성화합니다.
    await this.prismaService.shareAlbumInviteCode.updateMany({
      where: {
        shareAlbumId: albumId,
      },
      data: {
        deletedAt: new Date(),
        code: '',
      },
    });

    // 랜덤 숫자+문자 6자리를 생성합니다.
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    // 초대코드를 생성합니다.
    await this.prismaService.shareAlbumInviteCode.create({
      data: {
        shareAlbumId: albumId,
        code: inviteCode,
      },
    });
    return new CreateShareAlbumInviteCodeCommandResult({ inviteCode });
  }
}
