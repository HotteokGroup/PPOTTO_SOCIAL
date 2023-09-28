import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateShareAlbumHandler } from './command/create/create-album.handler';
import { ShareAlbumController } from './share-album.controller';
import { PrismaModule } from '../lib/prisma/prisma.module';

const commandHandlers = [CreateShareAlbumHandler];
@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [ShareAlbumController],
  providers: [...commandHandlers],
})
export class ShareAlbumModule {}
