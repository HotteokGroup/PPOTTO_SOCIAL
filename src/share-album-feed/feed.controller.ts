import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateShareAlbumFeedCommand } from './command/create-feed/create-feed.command';
import { DeleteShareAlbumFeedCommand } from './command/delete-feed/delete-feed.command';
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
  @ApiParam({ name: 'id', description: '공유앨범 아이디' })
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

  @Delete(':id/feed/:feedId')
  @ApiOperation({ summary: '공유앨범 피드 삭제', description: '공유앨범 피드를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '공유앨범 아이디' })
  @ApiParam({ name: 'feedId', description: '공유앨범 피드 아이디' })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INTERNAL_SERVER_ERROR,
    ERROR_CODE.SHARE_ALBUM_NOT_FOUND,
    ERROR_CODE.SHARE_ALBUM_FEED_NOT_FOUND,
  ])
  async deleteFeed(@Param('id') id: string, @Param('feedId') feedId: string) {
    await this.commandBus.execute(new DeleteShareAlbumFeedCommand({ feedId, shareAlbumId: id }));
    return true;
  }
}
