import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateShareAlbumHandler } from './command/create/create-album.handler';
import { ModifyShareAlbumHandler } from './command/modify/modify-album.handler';
import { GetSharedAlbumHandler } from './query/get-album/get-album.handler';
import { GetSharedAlbumsHandler } from './query/get-albums/get-albums.handler';
import { ShareAlbumController } from './share-album.controller';
import { PrismaModule } from '../lib/prisma/prisma.module';

const commandHandlers = [CreateShareAlbumHandler, ModifyShareAlbumHandler];
const queryHandlers = [GetSharedAlbumHandler, GetSharedAlbumsHandler];
@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [ShareAlbumController],
  providers: [...commandHandlers, ...queryHandlers],
})
export class ShareAlbumModule {}
