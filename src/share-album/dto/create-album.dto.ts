import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateShareAlbumRequest {
  @ApiProperty({ description: '공유앨범 명', example: '내 일상앨범' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '공유앨범 설명', example: '내 일상을 공유하는 앨범' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bio?: string;

  @ApiProperty({ description: '공유앨범 생성자의 아이디', example: '1' })
  @IsNumber()
  ownerId: number;

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
export class CreateShareAlbumResponse {
  @Expose()
  @ApiProperty({ description: '생성된 공유앨범의 아이디', example: 'cln3cu8oc00003cwtl5g5fp46' })
  id: string;
}
