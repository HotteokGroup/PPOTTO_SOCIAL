import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShareAlbumRequest {
  @ApiProperty({ description: '공유앨범 명', example: '내 일상앨범' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '공유앨범 설명', example: '내 일상을 공유하는 앨범' })
  @IsString()
  @IsNotEmpty()
  bio: string;

  @ApiProperty({ description: '공유앨범 생성자의 아이디', example: '1' })
  @IsNumber()
  ownerId: number;
}

@Exclude()
export class CreateShareAlbumResponse {
  @Expose()
  @ApiProperty({ description: '생성된 공유앨범의 아이디', example: 'cln3cu8oc00003cwtl5g5fp46' })
  id: string;
}
