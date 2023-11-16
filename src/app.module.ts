import {
  BadRequestException,
  ClassSerializerInterceptor,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionModule } from './collection/collection.module';
import { FeedModule } from './feed/feed.module';
import { AllExceptionsFilter } from './lib/exception/all-exception.filter';
import { ERROR_CODE } from './lib/exception/error.constant';
import { ShareAlbumModule } from './share-album/share-album.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `environments/.env.${process.env.NODE_ENV}` }),
    ShareAlbumModule,
    FeedModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true, // transform payload to DTO
        forbidUnknownValues: true, // throw error if unknown properties are present
        exceptionFactory: (errors: ValidationError[]) => {
          if (!errors[0]?.constraints) return new BadRequestException(ERROR_CODE.INVALID_DATA);
          const firstKey = Object.keys(errors[0].constraints)[0];
          throw new BadRequestException({ ...ERROR_CODE.INVALID_DATA, message: errors[0].constraints[firstKey] });
        },
      }),
    },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
