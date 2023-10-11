import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class ModifyShareAlbumRequest {
  @ApiProperty({ description: '공유앨범 명', example: '내 일상앨범' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '공유앨범 설명', example: '내 일상을 공유하는 앨범' })
  @IsString()
  @IsNotEmpty()
  bio: string;
}

@Exclude()
export class ModifyShareAlbumResponse {
  @Expose()
  @ApiProperty({ description: '수정된 공유앨범의 아이디', example: 'cln3cu8oc00003cwtl5g5fp46' })
  id: string;
}
