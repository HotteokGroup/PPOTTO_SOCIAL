import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ModifyShareAlbumCommand, ModifyShareAlbumCommandResult } from './modify-album.command';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(ModifyShareAlbumCommand)
export class ModifyShareAlbumHandler
  implements ICommandHandler<ModifyShareAlbumCommand, ModifyShareAlbumCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: ModifyShareAlbumCommand): Promise<ModifyShareAlbumCommandResult> {
    const { id, name, bio } = command;
    const updateResult = await this.prismaService.shareAlbum.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(bio && { bio }),
      },
    });

    return new ModifyShareAlbumCommandResult({ id: updateResult.id });
  }
}
