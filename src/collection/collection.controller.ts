import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateCollectionCommand } from './command/create-collection/create-collection.command';
import { DeleteCollectionCommand } from './command/delete-collection/delete-collection.command';
import { CreateCollectionRequest, CreateCollectionResponse } from './dto/create-collection.dto';
import { DeleteCollectionResponse } from './dto/delete-collection.dto';
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
}
