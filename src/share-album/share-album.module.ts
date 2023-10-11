import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateShareAlbumHandler } from './command/create/create-album.handler';
import { ModifyShareAlbumHandler } from './command/modify/modify-album.handler';
import { ShareAlbumController } from './share-album.controller';
import { PrismaModule } from '../lib/prisma/prisma.module';

const commandHandlers = [CreateShareAlbumHandler, ModifyShareAlbumHandler];
@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [ShareAlbumController],
  providers: [...commandHandlers],
})
export class ShareAlbumModule {}
