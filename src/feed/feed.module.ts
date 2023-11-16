import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateFeedCommentHandler } from './command/create-comment/create-comment.handler';
import { CreateFeedHandler } from './command/create-feed/create-feed.handler';
import { DeleteFeedCommentHandler } from './command/delete-comment/delete-comment.handler';
import { DeleteFeedHandler } from './command/delete-feed/delete-feed.handler';
import { ModifyFeedCommentHandler } from './command/modify-comment/modify-comment.handler';
import { ModifyFeedHandler } from './command/modify-feed/modify-feed.handler';
import { FeedController } from './feed.controller';
import { GetFeedHandler } from './query/get-feed/get-feed.handler';
import { GetFeedListHandler } from './query/get-feed-list/get-feed-list.handler';
import { PrismaModule } from '../lib/prisma/prisma.module';

const CommandHandlers = [
  CreateFeedHandler,
  CreateFeedCommentHandler,
  DeleteFeedHandler,
  DeleteFeedCommentHandler,
  ModifyFeedHandler,
  ModifyFeedCommentHandler,
];

const QueryHandlers = [GetFeedHandler, GetFeedListHandler];
@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [FeedController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class FeedModule {}
