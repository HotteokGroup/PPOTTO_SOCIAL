import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateShareAlbumFeedCommentHandler } from './command/create-comment/create-comment.handler';
import { CreateShareAlbumFeedHandler } from './command/create-feed/create-feed.handler';
import { DeleteShareAlbumFeedCommentHandler } from './command/delete-comment/delete-comment.handler';
import { DeleteShareAlbumFeedHandler } from './command/delete-feed/delete-feed.handler';
import { ModifyShareAlbumFeedCommentHandler } from './command/modify-comment/modify-comment.handler';
import { ModifyShareAlbumFeedHandler } from './command/modify-feed/modify-feed.handler';
import { ShareAlbumFeedController } from './feed.controller';
import { PrismaModule } from '../lib/prisma/prisma.module';

const CommandHandlers = [
  CreateShareAlbumFeedHandler,
  CreateShareAlbumFeedCommentHandler,
  DeleteShareAlbumFeedHandler,
  DeleteShareAlbumFeedCommentHandler,
  ModifyShareAlbumFeedHandler,
  ModifyShareAlbumFeedCommentHandler,
];
@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [ShareAlbumFeedController],
  providers: [...CommandHandlers],
})
export class ShareAlbumFeedModule {}
