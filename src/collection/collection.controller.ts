import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { AddFeedsToCollectionCommand } from './command/add-feed/add-feed.command';
import { CreateCollectionCommand } from './command/create-collection/create-collection.command';
import { DeleteCollectionCommand } from './command/delete-collection/delete-collection.command';
import { DeleteFeedsToCollectionCommand } from './command/delete-feed/delete-feed.command';
import { ModifyCollectionCommand } from './command/modify-collection/modify-collection.command';
import { AddFeedToCollectionRequest, AddFeedToCollectionResponse } from './dto/add-feed-to-collection.dto';
import { CreateCollectionRequest, CreateCollectionResponse } from './dto/create-collection.dto';
import { DeleteCollectionResponse } from './dto/delete-collection.dto';
import { DeleteFeedToCollectionResponse } from './dto/delete-feed-to-collection.dto';
import { ModifyCollectionRequest, ModifyCollectionResponse } from './dto/modify-collection.dto';
import { GenerateSwaggerDocumentByErrorCode, ERROR_CODE } from '../lib/exception/error.constant';

@Controller('collection')
@ApiTags('컬렉션')
export class CollectionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: '컬렉션 생성', description: '컬렉션을 생성합니다.' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR])
  async createCollection(@Body() params: CreateCollectionRequest) {
    return plainToInstance(
      CreateCollectionResponse,
      await this.commandBus.execute(new CreateCollectionCommand(params)),
    );
  }

  @Delete(':collectionId')
  @ApiOperation({ summary: '컬렉션 삭제', description: '컬렉션을 삭제합니다.' })
  @ApiParam({ name: 'collectionId', description: '컬렉션 아이디', example: 'clp0wkn6k00007z209fylkkgg' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.COLLECTION_NOT_FOUND])
  async deleteCollection(@Param('collectionId') collectionId: string) {
    return plainToInstance(
      DeleteCollectionResponse,
      await this.commandBus.execute(new DeleteCollectionCommand({ collectionId })),
    );
  }

  @Patch(':collectionId')
  @ApiOperation({ summary: '컬렉션 수정', description: '컬렉션을 수정합니다.' })
  @ApiParam({ name: 'collectionId', description: '컬렉션 아이디', example: 'clp0wkn6k00007z209fylkkgg' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.COLLECTION_NOT_FOUND])
  async modifyCollection(@Param('collectionId') collectionId: string, @Body() params: ModifyCollectionRequest) {
    return plainToInstance(
      ModifyCollectionResponse,
      await this.commandBus.execute(new ModifyCollectionCommand({ ...params, collectionId })),
    );
  }

  @Post(':collectionId/feed')
  @ApiOperation({ summary: '컬렉션에 피드 추가', description: '컬렉션에 피드를 추가합니다.' })
  @ApiParam({ name: 'collectionId', description: '컬렉션 아이디', example: 'clp0wkn6k00007z209fylkkgg' })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INTERNAL_SERVER_ERROR,
    ERROR_CODE.COLLECTION_NOT_FOUND,
    ERROR_CODE.SHARE_ALBUM_FEED_NOT_FOUND,
    ERROR_CODE.COLLECTION_FEED_ALREADY_EXIST,
  ])
  async addFeedToCollection(@Param('collectionId') collectionId: string, @Body() params: AddFeedToCollectionRequest) {
    return plainToInstance(
      AddFeedToCollectionResponse,
      await this.commandBus.execute(new AddFeedsToCollectionCommand({ ...params, collectionId })),
    );
  }

  @Delete(':collectionId/feed/:feedId')
  @ApiOperation({ summary: '컬렉션에 피드 삭제', description: '컬렉션에 피드를 삭제합니다.' })
  @ApiParam({ name: 'collectionId', description: '컬렉션 아이디', example: 'clp0wkn6k00007z209fylkkgg' })
  @ApiParam({ name: 'feedId', description: '피드 아이디', example: 'clp0wkn6k00007z209fylkkgg' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.COLLECTION_FEED_NOT_FOUND])
  async deleteFeedToCollection(@Param('collectionId') collectionId: string, @Param('feedId') feedId: string) {
    return plainToInstance(
      DeleteFeedToCollectionResponse,
      await this.commandBus.execute(new DeleteFeedsToCollectionCommand({ collectionId, feedId })),
    );
  }
}
