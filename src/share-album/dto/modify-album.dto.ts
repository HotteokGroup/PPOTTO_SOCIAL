import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ModifyShareAlbumRequest {
  @ApiProperty({ description: '공유앨범 명', example: '내 일상앨범' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ description: '공유앨범 설명', example: '내 일상을 공유하는 앨범' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bio?: string;

  @ApiProperty({ description: '썸네일 콘텐츠 아이디', example: 'cln3cu8oc00003cwtl5g5fp46' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  thumbnailId?: string;

  @ApiProperty({ description: '썸네일 URL', example: 'https://...' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  smallThumbnailUrl?: string;

  @ApiProperty({ description: '썸네일 URL', example: 'https://...' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  mediumThumbnailUrl?: string;

  @ApiProperty({ description: '썸네일 URL', example: 'https://...' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  largeThumbnailUrl?: string;
}

@Exclude()
export class ModifyShareAlbumResponse {
  @Expose()
  @ApiProperty({ description: '수정된 공유앨범의 아이디', example: 'cln3cu8oc00003cwtl5g5fp46' })
  id: string;
}
