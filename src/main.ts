import { writeFileSync } from 'fs';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import { CustomLogger } from './lib/logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  const servicePort = configService.getOrThrow<string>('SERVICE_PORT');
  const environment = configService.getOrThrow<string>('ENVIRONMENT');
  app.useLogger(new CustomLogger());

  if (environment !== 'local') {
    Sentry.init({
      dsn: 'https://72c8804c0e385bc74566c73211d03f73@o4505860408147968.ingest.sentry.io/4505873814061056',
      environment,
    });
    app.use(Sentry.Handlers.requestHandler());
  }

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
