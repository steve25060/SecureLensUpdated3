import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // ─────────────────────────────────────────────────────────────
  // CORS Configuration - Environment-aware
  // ─────────────────────────────────────────────────────────────
  // DEVELOPMENT: http://localhost:3000, http://localhost:3001
  // PRODUCTION: https://secure-lens-updated3-frontend.vercel.app
  //             https://secure-lens-updated3-frontend-ou5djyntz.vercel.app
  // ─────────────────────────────────────────────────────────────

  const frontendOrigins = (
    process.env.FRONTEND_ORIGIN || 'http://localhost:3000'
  )
    .split(',')
    .map((url) => url.trim());

  app.enableCors({
    origin: frontendOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 3600, // Cache preflight for 1 hour in production
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Get port from environment
  const port = process.env.PORT || 4000;
  const nodeEnv = process.env.NODE_ENV || 'development';

  await app.listen(port, '0.0.0.0');
  
  logger.log(`═══════════════════════════════════════════════════════════════`);
  logger.log(`Backend Server Started`);
  logger.log(`═══════════════════════════════════════════════════════════════`);
  logger.log(`Environment: ${nodeEnv}`);
  logger.log(`Port: ${port}`);
  logger.log(`CORS enabled for: ${frontendOrigins.join(', ')}`);
  logger.log(`Backend URL: http://0.0.0.0:${port}`);
  logger.log(`═══════════════════════════════════════════════════════════════`);
}

bootstrap().catch((err) => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});
