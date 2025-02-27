import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('API Sistema Palao')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    origin: 'http://localhost:5173', // Ajusta esto al puerto de tu frontend
    credentials: true,
  });

  // Usa express directamente para servir archivos estáticos
  app.use(express.static(join(__dirname, '..', 'front', 'dist')));

  // Configura una ruta específica para manejar todas las solicitudes no API
  app.use(/^(?!\/api).*$/, (req, res) => {
    res.sendFile(join(__dirname, '..', 'front', 'dist', 'index.html'));
  });

  await app.listen(Number(process.env.PORT) || 3000);
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
