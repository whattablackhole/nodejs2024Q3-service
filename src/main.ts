import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { writeFile } from 'node:fs/promises';
import { AllExceptionsFilter } from './exceptions/exception.filter';
import { LoggingService } from './modules/logging/logging.service';

config();

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setBasePath('/')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .build();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const loggingService = app.get(LoggingService);

  process.on('uncaughtException', (err: Error) => {
    loggingService.logUncaughtException(err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    loggingService.logUnhandledRejection(reason, promise);
    process.exit(1);
  });

  app.useGlobalFilters(new AllExceptionsFilter(loggingService));
  app.useLogger(loggingService);

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  const rearengedDocument = {
    openapi: document.openapi,
    info: document.info,
    servers: document.servers,
    tags: document.tags,
    components: document.components,
    security: document.security,
    paths: document.paths,
    externalDocs: document.externalDocs,
    ...document,
  };

  const yamlString = yaml.dump(rearengedDocument);

  await writeFile('doc/swagger.yaml', yamlString);

  await app.listen(process.env.PORT);
}
bootstrap();
