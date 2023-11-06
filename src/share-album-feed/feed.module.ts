import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateShareAlbumFeedHandler } from './command/create-feed/create-feed.handler';
import { ShareAlbumFeedController } from './feed.controller';
import { PrismaModule } from '../lib/prisma/prisma.module';

const CommandHandlers = [CreateShareAlbumFeedHandler];
@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [ShareAlbumFeedController],
  providers: [...CommandHandlers],
})
export class ShareAlbumFeedModule {}
