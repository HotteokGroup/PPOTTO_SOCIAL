import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateShareAlbumCommand } from './command/create/create-album.command';
import { CreateShareAlbumInviteCodeCommand } from './command/create-invite-code/create-invite-code.command';
import { JoinShareAlbumByInviteCodeCommand } from './command/join-album-by-invite-code/join-album-by-invite-code.command';
import { ModifyShareAlbumCommand } from './command/modify/modify-album.command';
import { ModifyShareAlbumMemberCommand } from './command/modify-member/modify-member.command';
import { CreateShareAlbumRequest, CreateShareAlbumResponse } from './dto/create-album.dto';
import { CreateShareAlbumInviteCodeResponse } from './dto/create-invite-code.dto';
import { GetSharedAlbumResponse } from './dto/get-album.dto';
import { GetSharedAlbumsResponse } from './dto/get-albums.dto';
import {
  JoinShareAlbumByInviteCodeRequest,
  JoinShareAlbumByInviteCodeResponse,
} from './dto/join-album-by-Invite-code.det';
import { ModifyShareAlbumMemberRequest, ModifyShareAlbumMemberResponse } from './dto/modify-album-member.dt';
import { ModifyShareAlbumRequest, ModifyShareAlbumResponse } from './dto/modify-album.dto';
import { GetSharedAlbumQuery } from './query/get-album/get-album.query';
import { GetSharedAlbumsQuery } from './query/get-albums/get-albums.query';
import { ERROR_CODE, GenerateSwaggerDocumentByErrorCode } from '../lib/exception/error.constant';

@Controller('share-album')
@ApiTags('공유앨범')
export class ShareAlbumController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: '공유앨범 조회', description: '공유앨범을 조회합니다.' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SHARE_ALBUM_NOT_FOUND])
  async getShareAlbum(@Param('id') id: string) {
    return plainToInstance(GetSharedAlbumResponse, await this.queryBus.execute(new GetSharedAlbumQuery({ id })));
  }

  @Get()
  @ApiOperation({ summary: '공유앨범 리스트 조회', description: '공유앨범 리스트를 조회합니다.' })
  @ApiQuery({ name: 'userId', description: '유저 아이디', example: 1 })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR])
  async getShareAlbums(@Query('userId', ParseIntPipe) userId: number) {
    return plainToInstance(GetSharedAlbumsResponse, await this.queryBus.execute(new GetSharedAlbumsQuery({ userId })));
  }

  @Post()
  @ApiOperation({ summary: '공유앨범 생성', description: '공유앨범을 생성합니다.' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR])
  async createShareAlbum(@Body() params: CreateShareAlbumRequest) {
    return plainToInstance(
      CreateShareAlbumResponse,
      await this.commandBus.execute(new CreateShareAlbumCommand(params)),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: '공유앨범 수정', description: '공유앨범을 수정합니다.' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR])
  async modifyShareAlbum(@Param('id') id: string, @Body() params: ModifyShareAlbumRequest) {
    return plainToInstance(
      ModifyShareAlbumResponse,
      await this.commandBus.execute(new ModifyShareAlbumCommand({ ...params, id })),
    );
  }

  @Post(':id/invite-code')
  @ApiOperation({ summary: '공유앨범 초대코드 생성', description: '공유앨범 초대코드를 생성합니다.' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SHARE_ALBUM_NOT_FOUND])
  async createShareAlbumInviteCode(@Param('id') id: string) {
    return plainToInstance(
      CreateShareAlbumInviteCodeResponse,
      await this.commandBus.execute(new CreateShareAlbumInviteCodeCommand({ albumId: id })),
    );
  }

  @Post('invite-code/:code')
  @ApiOperation({
    summary: '공유앨범 초대코드로 공유앨범 가입',
    description: '공유앨범 초대코드로 공유앨범에 가입합니다.',
  })
  @ApiParam({ name: 'code', description: '공유앨범 초대코드', example: 'I8Q32D' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SHARE_ALBUM_INVITE_CODE_NOT_FOUND])
  async joinShareAlbumByInviteCode(
    @Param('code') code: string,
    @Body() joinShareAlbumByInviteCodeRequest: JoinShareAlbumByInviteCodeRequest,
  ) {
    return plainToInstance(
      JoinShareAlbumByInviteCodeResponse,
      await this.commandBus.execute(
        new JoinShareAlbumByInviteCodeCommand({ inviteCode: code, ...joinShareAlbumByInviteCodeRequest }),
      ),
    );
  }

  @Patch(':id/member/:userId')
  @ApiOperation({ summary: '공유앨범 맴버 수정', description: '공유앨범 맴버를 수정합니다.' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR])
  async modifyShareAlbumMember(
    @Param('id') id: string,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() params: ModifyShareAlbumMemberRequest,
  ) {
    return plainToInstance(
      ModifyShareAlbumMemberResponse,
      await this.commandBus.execute(new ModifyShareAlbumMemberCommand({ ...params, albumId: id, userId })),
    );
  }
}
