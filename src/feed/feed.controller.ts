import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateFeedCommentCommand } from './command/create-comment/create-comment.command';
import { CreateFeedCommand } from './command/create-feed/create-feed.command';
import { DeleteFeedCommentCommand } from './command/delete-comment/delete-comment.command';
import { DeleteFeedCommand } from './command/delete-feed/delete-feed.command';
import { ModifyFeedCommentCommand } from './command/modify-comment/modify-comment.command';
import { ModifyFeedCommand } from './command/modify-feed/modify-feed.command';
import { CreateFeedCommentRequest, CreateFeedCommentResponse } from './dto/create-comment.dto';
import { CreateFeedRequest, CreateFeedResponse } from './dto/create-feed.dto';
import { DeleteFeedCommentRequest, DeleteFeedCommentResponse } from './dto/delete-comment.dto';
import { GetFeedListRequest, GetFeedListResponse } from './dto/get-feed-list.dto';
import { GetFeedResponse } from './dto/get-feed.dto';
import { ModifyFeedCommentRequest, ModifyFeedCommentResponse } from './dto/modify-comment.dto';
import { ModifyFeedRequest } from './dto/modify-feed.dto';
import { GetFeedQuery } from './query/get-feed/get-feed.query';
import { GetFeedListQuery } from './query/get-feed-list/get-feed-list.query';
import { ERROR_CODE, GenerateSwaggerDocumentByErrorCode } from '../lib/exception/error.constant';

@Controller('share-album')
@ApiTags('공유앨범-피드')
export class FeedController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id/feed')
  @ApiOperation({ summary: '공유앨범 피드 리스트', description: '공유앨범 피드 리스트를 가져옵니다.' })
  @ApiParam({ name: 'id', description: '공유앨범 아이디' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SHARE_ALBUM_NOT_FOUND])
  async getFeedList(@Query() params: GetFeedListRequest, @Param('id') id: string) {
    return plainToInstance(
      GetFeedListResponse,
      await this.queryBus.execute(new GetFeedListQuery({ ...params, shareAlbumId: id })),
    );
  }

  @Get(':id/feed/:feedId')
  @ApiOperation({ summary: '공유앨범 피드', description: '공유앨범 피드를 가져옵니다.' })
  @ApiParam({ name: 'id', description: '공유앨범 아이디' })
  @ApiParam({ name: 'feedId', description: '공유앨범 피드 아이디' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR])
  async getFeed(@Param('feedId') feedId: string, @Param('id') id: string) {
    return plainToInstance(
      GetFeedResponse,
      await this.queryBus.execute(new GetFeedQuery({ feedId, shareAlbumId: id })),
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
  async createFeed(@Param('id') id: string, @Body() params: CreateFeedRequest) {
    return plainToInstance(
      CreateFeedResponse,
      await this.commandBus.execute(new CreateFeedCommand({ ...params, shareAlbumId: id })),
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
    await this.commandBus.execute(new DeleteFeedCommand({ feedId, shareAlbumId: id }));
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
  async updateFeed(@Param('id') id: string, @Param('feedId') feedId: string, @Body() params: ModifyFeedRequest) {
    await this.commandBus.execute(new ModifyFeedCommand({ ...params, feedId, shareAlbumId: id }));
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
  async createComment(@Param('feedId') feedId: string, @Body() params: CreateFeedCommentRequest) {
    return plainToInstance(
      CreateFeedCommentResponse,
      await this.commandBus.execute(new CreateFeedCommentCommand({ ...params, feedId })),
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
    @Body() params: DeleteFeedCommentRequest,
  ) {
    return plainToInstance(
      DeleteFeedCommentResponse,
      await this.commandBus.execute(new DeleteFeedCommentCommand({ feedId, commentId, ...params })),
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
    @Body() params: ModifyFeedCommentRequest,
  ) {
    return plainToInstance(
      ModifyFeedCommentResponse,
      await this.commandBus.execute(new ModifyFeedCommentCommand({ feedId, commentId, ...params })),
    );
  }
}
