import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateCollectionCommand } from './command/create-collection/create-collection.command';
import { CreateCollectionRequest, CreateCollectionResponse } from './dto/create-collection.dto';
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
}
