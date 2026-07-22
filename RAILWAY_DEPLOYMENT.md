# SecureLens Backend Deployment on Railway

## Overview
This guide explains how to deploy the SecureLens backend on Railway, integrating with the Vercel frontend already deployed.

## Prerequisites
- Railway account (https://railway.app)
- GitHub repository pushed (already done)
- Environment variables configured
- PostgreSQL and Redis databases

## Deployment Steps

### 1. Create a New Project on Railway

1. Go to [Railway Dashboard](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Choose your repository: `steve25060/SecureLensUpdated3`
5. Confirm deployment

### 2. Add Services

#### PostgreSQL Database
1. Click "Add Service" → "Database" → "PostgreSQL"
2. Railway will create a PostgreSQL instance
3. Copy the `DATABASE_URL` from the service details
4. This will be auto-set in environment variables

#### Redis Cache
1. Click "Add Service" → "Database" → "Redis"
2. Railway will create a Redis instance
3. Copy the `REDIS_URL` from the service details
4. This will be auto-set in environment variables

### 3. Configure Environment Variables

In Railway Project Settings, add these environment variables:

```bash
# Node Environment
NODE_ENV=production
PORT=3000

# Frontend URL (from Vercel)
FRONTEND_ORIGIN=https://secure-lens-updated3-frontend-akz4.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://<your-railway-domain>.railway.app

# JWT Configuration
JWT_SECRET=your_very_secure_jwt_secret_minimum_32_characters_long
JWT_EXPIRATION=24h

# Optional: OAuth Configuration
# GITHUB_CLIENT_ID=<your_github_client_id>
# GITHUB_CLIENT_SECRET=<your_github_client_secret>
# GITHUB_CALLBACK_URL=https://<your-railway-domain>.railway.app/api/auth/github/callback

# Optional: Google OAuth
# GOOGLE_CLIENT_ID=<your_google_client_id>
# GOOGLE_CLIENT_SECRET=<your_google_client_secret>
# GOOGLE_CALLBACK_URL=https://<your-railway-domain>.railway.app/api/auth/google/callback

# Logging
LOG_LEVEL=info
ENABLE_PRETTY_LOGS=false  # Set to false in production
```

**Note:** PostgreSQL `DATABASE_URL` and Redis `REDIS_URL` are automatically set by Railway.

### 4. Configure Build and Deploy Settings

1. Go to "Deployment" settings in Railway
2. Set Build Command:
   ```bash
   npm install -g pnpm && pnpm install --frozen-lockfile && cd apps/backend && pnpm run build
   ```
3. Set Start Command:
   ```bash
   node apps/backend/dist/main.js
   ```
4. Set Port: `3000`

### 5. Run Database Migrations

After first deployment, run migrations:

1. In Railway, go to "Deploy Logs"
2. Click "Run SSH Console" (or use Railway CLI)
3. Run the following commands:
   ```bash
   cd apps/backend
   npx prisma migrate deploy
   npx prisma db seed  # Optional: seed initial data
   ```

Alternatively, add a migration job:
```bash
# In railway.toml or as a separate service
cd apps/backend && npx prisma migrate deploy && npm run start
```

### 6. Update Frontend Configuration

Update the Vercel frontend deployment to point to your Railway backend:

1. Go to Vercel Project Settings
2. Update environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://<your-railway-domain>.railway.app/api
   NEXT_PUBLIC_BACKEND_URL=https://<your-railway-domain>.railway.app
   ```
3. Redeploy the frontend

### 7. Configure Custom Domain (Optional)

1. In Railway, go to "Settings" → "Domains"
2. Add a custom domain (e.g., `api.yourdomain.com`)
3. Update DNS records as instructed

## Local Development Setup

### Build Locally
```bash
# Install dependencies
pnpm install

# Build backend
cd apps/backend
pnpm run build

# Run migrations
pnpm run prisma:migrate
```

### Run Locally
```bash
# Development mode
pnpm run dev

# Production mode (local)
cd apps/backend
npm run start
```

## Troubleshooting

### 1. Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Check PostgreSQL is running
- Ensure migrations have been applied:
  ```bash
  npx prisma migrate deploy
  ```

### 2. CORS Errors
- Verify `FRONTEND_ORIGIN` environment variable matches your Vercel frontend URL
- Check backend CORS configuration in `main.ts`

### 3. Build Failures
- Check logs in Railway console
- Ensure all dependencies are listed in `package.json`
- Verify Node version compatibility (should be >= 20.0.0)

### 4. Application Not Starting
- Check health endpoint: `https://<domain>/api/health`
- Review deployment logs in Railway
- Verify all environment variables are set

### 5. Port Issues
- Railway automatically assigns a port via `$PORT` environment variable
- Ensure backend listens on `0.0.0.0` (done in updated `main.ts`)
- Application should listen on `process.env.PORT` (defaults to 3000)

## Monitoring

### Health Check
Test the backend health:
```bash
curl https://<your-railway-domain>.railway.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-07-21T23:43:46.480Z",
  "uptime": 1234.56,
  "environment": "production"
}
```

### Logs
- Access logs in Railway dashboard under "Deploy Logs"
- Use `pino` logger for structured logging
- Monitor error rates and performance

## CI/CD Pipeline

Railway automatically deploys on every push to:
- Main branch (or configured branch)
- Automatic rollback on build failure
- Preview deployments for PRs (optional)

## Performance Optimization

1. **Database Indexing:** Ensure proper indexes in Prisma schema
2. **Caching:** Configure Redis for session management
3. **Rate Limiting:** Implement rate limiting middleware
4. **Compression:** Enable gzip compression in NestJS

## Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] CORS origin matches frontend domain exactly
- [ ] Database credentials are secure
- [ ] Redis password is set
- [ ] OAuth secrets are configured (if using)
- [ ] HTTPS is enforced
- [ ] Sensitive endpoints are protected
- [ ] Input validation is enabled (already done)

## Rollback

To rollback to a previous deployment:
1. Go to Railway → "Deployments"
2. Click on a previous deployment
3. Click "Redeploy"
4. Railway will redeploy that version

## Next Steps

1. Update Vercel frontend with correct backend URL
2. Test API endpoints from frontend
3. Monitor logs for any errors
4. Configure OAuth if needed
5. Set up CI/CD pipelines
6. Monitor performance and costs

## Support

- Railway Docs: https://docs.railway.app
- NestJS Docs: https://docs.nestjs.com
- Prisma Docs: https://www.prisma.io/docs
