import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ModifyShareAlbumMemberCommand, ModifyShareAlbumMemberCommandResult } from './modify-member.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(ModifyShareAlbumMemberCommand)
export class ModifyShareAlbumMemberHandler
  implements ICommandHandler<ModifyShareAlbumMemberCommand, ModifyShareAlbumMemberCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: ModifyShareAlbumMemberCommand): Promise<ModifyShareAlbumMemberCommandResult> {
    const { albumId, userId, role } = command;

    // 해당 엘범에 해당 유저가 존재하는지 확인합니다.
    const member = await this.prismaService.shareAlbumMember.findFirst({
      where: {
        shareAlbumId: albumId,
        userId,
      },
    });
    if (!member) {
      throw new NotFoundException(ERROR_CODE.SHARE_ALBUM_MEMBER_NOT_FOUND);
    }

    // 멤버의 권한을 수정합니다.
    await this.prismaService.shareAlbumMember.update({
      where: {
        id: member.id,
      },
      data: {
        role,
      },
    });

    return new ModifyShareAlbumMemberCommandResult({ albumId, userId, role });
  }
}
