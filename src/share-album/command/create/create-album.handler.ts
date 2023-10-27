import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateShareAlbumCommand, CreateShareAlbumCommandResult } from './create-album.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CreateShareAlbumCommand)
export class CreateShareAlbumHandler
  implements ICommandHandler<CreateShareAlbumCommand, CreateShareAlbumCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateShareAlbumCommand): Promise<CreateShareAlbumCommandResult> {
    const { name, bio, ownerId } = command;

    // 공유앨범을 생성 및 멤버로 추가 후 아이디를 반환합니다
    // TODO: 생성일 시간대 UTC변경
    try {
      const result = await this.prismaService.shareAlbum.create({
        data: {
          name,
          bio,
          shareAlbumMember: {
            create: {
              userId: ownerId,
              role: 'OWNER',
              joinedAt: new Date(),
            },
          },
        },
      });
      return new CreateShareAlbumCommandResult({ id: result.id });
    } catch (error) {
      Logger.error('공유앨범 생성 실패', error);
      throw new InternalServerErrorException({
        ...ERROR_CODE.INTERNAL_SERVER_ERROR,
        message: '공유앨범 생성에 실패했습니다.',
      });
    }
  }
}
