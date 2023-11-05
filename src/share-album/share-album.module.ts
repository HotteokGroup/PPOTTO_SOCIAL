import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateShareAlbumHandler } from './command/create/create-album.handler';
import { CreateShareAlbumInviteCodeHandler } from './command/create-invite-code/create-invite-code.handler';
import { JoinShareAlbumByInviteCodeHandler } from './command/join-album-by-invite-code/join-album-by-invite-code.handler';
import { ModifyShareAlbumHandler } from './command/modify/modify-album.handler';
import { GetSharedAlbumHandler } from './query/get-album/get-album.handler';
import { GetSharedAlbumsHandler } from './query/get-albums/get-albums.handler';
import { ShareAlbumController } from './share-album.controller';
import { PrismaModule } from '../lib/prisma/prisma.module';

const commandHandlers = [
  CreateShareAlbumHandler,
  ModifyShareAlbumHandler,
  CreateShareAlbumInviteCodeHandler,
  JoinShareAlbumByInviteCodeHandler,
];
const queryHandlers = [GetSharedAlbumHandler, GetSharedAlbumsHandler];
@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [ShareAlbumController],
  providers: [...commandHandlers, ...queryHandlers],
})
export class ShareAlbumModule {}
