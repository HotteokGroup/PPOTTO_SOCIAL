import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CollectionController } from './collection.controller';
import { AddFeedsToCollectionHandler } from './command/add-feed/add-feed.handler';
import { CreateCollectionHandler } from './command/create-collection/create-collection.handler';
import { DeleteCollectionHandler } from './command/delete-collection/delete-collection.handler';
import { DeleteFeedsToCollectionHandler } from './command/delete-feed/delete-feed.handler';
import { ModifyCollectionHandler } from './command/modify-collection/modify-collection.handler';
import { PrismaModule } from '../lib/prisma/prisma.module';

const commandHandlers = [
  AddFeedsToCollectionHandler,
  CreateCollectionHandler,
  DeleteCollectionHandler,
  DeleteFeedsToCollectionHandler,
  ModifyCollectionHandler,
];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [CollectionController],
  providers: [...commandHandlers],
})
export class CollectionModule {}
