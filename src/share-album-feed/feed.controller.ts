import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateShareAlbumFeedCommentCommand } from './command/create-comment/create-comment.command';
import { CreateShareAlbumFeedCommand } from './command/create-feed/create-feed.command';
import { DeleteShareAlbumFeedCommentCommand } from './command/delete-comment/delete-comment.command';
import { DeleteShareAlbumFeedCommand } from './command/delete-feed/delete-feed.command';
import { ModifyShareAlbumFeedCommentCommand } from './command/modify-comment/modify-comment.command';
import { ModifyShareAlbumFeedCommand } from './command/modify-feed/modify-feed.command';
import { CreateShareAlbumFeedCommentRequest, CreateShareAlbumFeedCommentResponse } from './dto/create-comment.dto';
import { CreateShareAlbumFeedRequest, CreateShareAlbumFeedResponse } from './dto/create-feed.dto';
import { DeleteShareAlbumFeedCommentRequest, DeleteShareAlbumFeedCommentResponse } from './dto/delete-comment.dto';
import { GetShareAlbumFeedListRequest, GetShareAlbumFeedListResponse } from './dto/get-feed-list.dto';
import { GetShareAlbumFeedResponse } from './dto/get-feed.dto';
import { ModifyShareAlbumFeedCommentRequest, ModifyShareAlbumFeedCommentResponse } from './dto/modify-comment.dto';
import { ModifyShareAlbumFeedRequest } from './dto/modify-feed.dto';
import { GetShareAlbumFeedQuery } from './query/get-feed/get-feed.query';
import { GetShareAlbumFeedListQuery } from './query/get-feed-list/get-feed-list.query';
import { ERROR_CODE, GenerateSwaggerDocumentByErrorCode } from '../lib/exception/error.constant';

@Controller('share-album')
@ApiTags('공유앨범-피드')
export class ShareAlbumFeedController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id/feed')
  @ApiOperation({ summary: '공유앨범 피드 리스트', description: '공유앨범 피드 리스트를 가져옵니다.' })
  @ApiParam({ name: 'id', description: '공유앨범 아이디' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SHARE_ALBUM_NOT_FOUND])
  async getFeedList(@Query() params: GetShareAlbumFeedListRequest, @Param('id') id: string) {
    return plainToInstance(
      GetShareAlbumFeedListResponse,
      await this.queryBus.execute(new GetShareAlbumFeedListQuery({ ...params, shareAlbumId: id })),
    );
  }

  @Get(':id/feed/:feedId')
  @ApiOperation({ summary: '공유앨범 피드', description: '공유앨범 피드를 가져옵니다.' })
  @ApiParam({ name: 'id', description: '공유앨범 아이디' })
  @ApiParam({ name: 'feedId', description: '공유앨범 피드 아이디' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR])
  async getFeed(@Param('feedId') feedId: string, @Param('id') id: string) {
    return plainToInstance(
      GetShareAlbumFeedResponse,
      await this.queryBus.execute(new GetShareAlbumFeedQuery({ feedId, shareAlbumId: id })),
    );
  }

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

  @Patch(':id/feed/:feedId')
  @ApiOperation({ summary: '공유앨범 피드 수정', description: '공유앨범 피드를 수정합니다.' })
  @ApiParam({ name: 'id', description: '공유앨범 아이디' })
  @ApiParam({ name: 'feedId', description: '공유앨범 피드 아이디' })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INTERNAL_SERVER_ERROR,
    ERROR_CODE.SHARE_ALBUM_NOT_FOUND,
    ERROR_CODE.SHARE_ALBUM_FEED_NOT_FOUND,
  ])
  async updateFeed(
    @Param('id') id: string,
    @Param('feedId') feedId: string,
    @Body() params: ModifyShareAlbumFeedRequest,
  ) {
    await this.commandBus.execute(new ModifyShareAlbumFeedCommand({ ...params, feedId, shareAlbumId: id }));
    return true;
  }

  @Post('feed/:feedId/comment')
  @ApiOperation({ summary: '공유앨범 피드 댓글 생성', description: '공유앨범 피드 댓글을 생성합니다.' })
  @ApiParam({ name: 'feedId', description: '공유앨범 피드 아이디' })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INTERNAL_SERVER_ERROR,
    ERROR_CODE.SHARE_ALBUM_FEED_NOT_FOUND,
    ERROR_CODE.SHARE_ALBUM_MEMBER_NOT_FOUND,
  ])
  async createComment(@Param('feedId') feedId: string, @Body() params: CreateShareAlbumFeedCommentRequest) {
    return plainToInstance(
      CreateShareAlbumFeedCommentResponse,
      await this.commandBus.execute(new CreateShareAlbumFeedCommentCommand({ ...params, feedId })),
    );
  }

  @Delete('feed/:feedId/comment/:commentId')
  @ApiOperation({ summary: '공유앨범 피드 댓글 삭제', description: '공유앨범 피드 댓글을 삭제합니다.' })
  @ApiParam({ name: 'feedId', description: '공유앨범 피드 아이디' })
  @ApiParam({ name: 'commentId', description: '공유앨범 피드 댓글 아이디' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SHARE_ALBUM_FEED_COMMENT_NOT_FOUND])
  async deleteComment(
    @Param('feedId') feedId: string,
    @Param('commentId') commentId: string,
    @Body() params: DeleteShareAlbumFeedCommentRequest,
  ) {
    return plainToInstance(
      DeleteShareAlbumFeedCommentResponse,
      await this.commandBus.execute(new DeleteShareAlbumFeedCommentCommand({ feedId, commentId, ...params })),
    );
  }

  @Patch('feed/:feedId/comment/:commentId')
  @ApiOperation({ summary: '공유앨범 피드 댓글 수정', description: '공유앨범 피드 댓글을 수정합니다.' })
  @ApiParam({ name: 'feedId', description: '공유앨범 피드 아이디' })
  @ApiParam({ name: 'commentId', description: '공유앨범 피드 댓글 아이디' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SHARE_ALBUM_FEED_COMMENT_NOT_FOUND])
  async updateComment(
    @Param('feedId') feedId: string,
    @Param('commentId') commentId: string,
    @Body() params: ModifyShareAlbumFeedCommentRequest,
  ) {
    return plainToInstance(
      ModifyShareAlbumFeedCommentResponse,
      await this.commandBus.execute(new ModifyShareAlbumFeedCommentCommand({ feedId, commentId, ...params })),
    );
  }
}
