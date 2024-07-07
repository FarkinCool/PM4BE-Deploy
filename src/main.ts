import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Nest JS API')
    .setDescription('Proyecto Integrador M4-FT50 Team Back')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(LoggerGlobalMiddleware);
  app.useGlobalPipes(new ValidationPipe({whitelist:true, }));
  await app.listen(PORT);
  console.log(`Server listening on http://localhost:3000`);
  
}
bootstrap();
