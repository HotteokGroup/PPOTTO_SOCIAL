import { writeFileSync } from 'fs';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const servicePort = configService.getOrThrow<string>('SERVICE_PORT');
  const environment = configService.getOrThrow<string>('ENVIRONMENT');

  if (environment !== 'prod') {
    const config = new DocumentBuilder()
      .setTitle('PPOTTO Social API')
      .setDescription('뽀또 소셜서비스')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, { customSiteTitle: 'Social Service API' });
    // 로컬 개발환경의 경우 OpenAPI JSON을 확인할 수 있도록 저장
    if (environment === 'local') {
      writeFileSync('open-api/open-api-spec.json', JSON.stringify(document));
    }
  }

  await app.listen(servicePort);
}
bootstrap();
