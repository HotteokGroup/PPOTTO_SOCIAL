import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateShareAlbumFeedCommand } from './command/create-feed/create-feed.command';
import { CreateShareAlbumFeedRequest, CreateShareAlbumFeedResponse } from './dto/create-feed.dto';
import { ERROR_CODE, GenerateSwaggerDocumentByErrorCode } from '../lib/exception/error.constant';

@Controller('share-album')
@ApiTags('공유앨범-피드')
export class ShareAlbumFeedController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':id/feed')
  @ApiOperation({ summary: '공유앨범 피드 생성', description: '공유앨범 피드를 생성합니다.' })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INTERNAL_SERVER_ERROR,
    ERROR_CODE.SHARE_ALBUM_NOT_FOUND,
    ERROR_CODE.SHARE_ALBUM_MEMBER_NOT_FOUND,
  ])
  async createFeed(@Param('id') id: string, @Body() params: CreateShareAlbumFeedRequest) {
    return plainToInstance(
      CreateShareAlbumFeedResponse,
      await this.commandBus.execute(new CreateShareAlbumFeedCommand({ ...params, shareAlbumId: id })),
    );
  }
}
