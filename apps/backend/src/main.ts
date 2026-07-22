import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Enable CORS for the frontend origin
  const frontendOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:3000').split(',').map(url => url.trim());
  app.enableCors({
    origin: frontendOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Get port from environment
  const port = process.env.PORT || 4000;
  const nodeEnv = process.env.NODE_ENV || 'development';

  await app.listen(port, '0.0.0.0');
  logger.log(`Backend listening on port ${port}`);
  logger.log(`Environment: ${nodeEnv}`);
  logger.log(`CORS enabled for: ${frontendOrigins.join(', ')}`);
}

bootstrap().catch(err => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});
