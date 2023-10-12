import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateShareAlbumCommand } from './command/create/create-album.command';
import { ModifyShareAlbumCommand } from './command/modify/modify-album.command';
import { CreateShareAlbumRequest, CreateShareAlbumResponse } from './dto/create-album.dto';
import { GetSharedAlbumResponse } from './dto/get-album.dto';
import { ModifyShareAlbumRequest, ModifyShareAlbumResponse } from './dto/modify-album.dto';
import { GetSharedAlbumQuery } from './query/get-album/get-album.query';
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
}
