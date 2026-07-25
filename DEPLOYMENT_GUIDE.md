# SecureLens Deployment Guide

## Overview

Your SecureLens application is now configured for three environments:

1. **Local Development** (http://localhost:3000 & http://localhost:4000)
2. **Production Frontend** (Vercel: https://secure-lens-updated3-frontend.vercel.app)
3. **Production Backend** (Render: https://securelensupdated3.onrender.com)

---

## 1. LOCAL DEVELOPMENT SETUP

### Prerequisites
- Node.js >= 20.0.0
- PostgreSQL running on `localhost:5433` (or update `DATABASE_URL` in `.env`)
- Redis running on `localhost:6380` (or update `REDIS_URL` in `.env`)
- pnpm installed

### Environment Configuration
- Uses `.env` file (already configured)
- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:4000`
- Frontend proxies API calls via Next.js rewrites

### Start Local Development

```bash
# Install dependencies (from root)
pnpm install

# Start frontend (from root or apps/frontend)
pnpm run dev --filter @securelens/frontend

# Start backend in separate terminal (from root or apps/backend)
pnpm run dev --filter @securelens/backend

# Optional: Start worker in separate terminal
pnpm run dev --filter @securelens/worker
```

### Access Local Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api
- **API Docs**: http://localhost:4000/api/docs (if Swagger is enabled)

---

## 2. PRODUCTION FRONTEND DEPLOYMENT (Vercel)

### Prerequisites
- Vercel account
- GitHub account (for Vercel integration)
- Repository pushed to GitHub

### Steps to Deploy

#### Step 1: Connect to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel --prod
```

#### Step 2: Configure Environment Variables in Vercel Dashboard

Go to **Project Settings → Environment Variables** and add:

```
NEXT_PUBLIC_API_URL=https://securelensupdated3.onrender.com/api
NEXT_PUBLIC_BACKEND_URL=https://securelensupdated3.onrender.com
NODE_ENV=production
```

#### Step 3: Configure Build Settings

In **Project Settings → Build & Development Settings**:

- **Framework Preset**: Next.js
- **Build Command**: `pnpm run build --filter @securelens/frontend`
- **Output Directory**: `apps/frontend/.next`
- **Install Command**: `pnpm install --frozen-lockfile`

#### Step 4: Verify Deployment

- Production: https://secure-lens-updated3-frontend.vercel.app
- Preview deployments get automatic URLs

---

## 3. PRODUCTION BACKEND DEPLOYMENT (Render)

### Prerequisites
- Render account (https://render.com)
- GitHub repository connected to Render

### Steps to Deploy

#### Step 1: Create PostgreSQL Database on Render

1. Go to Render Dashboard → Create New
2. Choose **PostgreSQL**
3. Configure:
   - Name: `securelens-db`
   - Database: `securelens`
   - User: `securelens`
   - Region: Choose closest to you
   - Plan: Standard (or higher for production)
4. Copy the `Internal Database URL` (for backend within Render)
   - Format: `postgresql://user:password@hostname:5432/dbname`

#### Step 2: Create Redis Cache on Render

1. Go to Render Dashboard → Create New
2. Choose **Redis**
3. Configure:
   - Name: `securelens-redis`
   - Region: Same as database
   - Plan: Standard (or higher)
4. Copy the Redis connection URL
   - Format: `redis://username:password@hostname:6379`

#### Step 3: Create Web Service for Backend

1. Go to Render Dashboard → Create New
2. Choose **Web Service**
3. Configure:
   - **Name**: `securelens-backend`
   - **Repository**: Select your GitHub repo
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or specify if not at project root)
   - **Runtime**: Node
   - **Build Command**: 
     ```
     pnpm install && pnpm run build --filter @securelens/backend...
     ```
   - **Start Command**: 
     ```
     node apps/backend/dist/main.js
     ```
   - **Plan**: Standard or Professional (depending on load)

#### Step 4: Set Environment Variables

In Render Dashboard for backend service, go to **Environment** and add:

```
NODE_ENV=production
PORT=4000
BACKEND_URL=https://securelensupdated3.onrender.com
DATABASE_URL=postgresql://user:password@host:5432/dbname
REDIS_URL=redis://username:password@hostname:6379
JWT_SECRET=your_production_jwt_secret_min_32_chars_change_this
JWT_EXPIRATION=24h
FRONTEND_ORIGIN=https://secure-lens-updated3-frontend.vercel.app,https://secure-lens-updated3-frontend-ou5djyntz.vercel.app
FRONTEND_URL=https://secure-lens-updated3-frontend.vercel.app
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
GITHUB_CALLBACK_URL=https://securelensupdated3.onrender.com/api/auth/github/callback
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_CALLBACK_URL=https://securelensupdated3.onrender.com/api/auth/google/callback
LOG_LEVEL=warn
ENABLE_PRETTY_LOGS=false
```

#### Step 5: Configure Health Check

In service settings, set:
- **Health Check Path**: `/api/health`
- **Health Check Interval**: 10 minutes

#### Step 6: Deploy

Click **Create Web Service** and Render will auto-deploy from your GitHub repository.

---

## 4. OAUTH CONFIGURATION

### GitHub OAuth Setup

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Create New OAuth App:
   - **Application name**: SecureLens
   - **Homepage URL**: https://secure-lens-updated3-frontend.vercel.app
   - **Authorization callback URL**: https://securelensupdated3.onrender.com/api/auth/github/callback
3. Copy **Client ID** and **Client Secret**
4. Add to Render environment variables:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`

### Google OAuth Setup

1. Go to Google Cloud Console → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID:
   - **Application type**: Web application
   - **Authorized JavaScript origins**: 
     - https://secure-lens-updated3-frontend.vercel.app
   - **Authorized redirect URIs**: 
     - https://securelensupdated3.onrender.com/api/auth/google/callback
3. Copy **Client ID** and **Client Secret**
4. Add to Render environment variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

---

## 5. VERIFY DEPLOYMENT

### Check Frontend
```bash
# Test production URL
curl https://secure-lens-updated3-frontend.vercel.app

# Check environment variables (in browser console)
fetch('https://secure-lens-updated3-frontend.vercel.app')
  .then(r => r.text())
  .then(html => console.log('Frontend is running'))
```

### Check Backend
```bash
# Test API health
curl https://securelensupdated3.onrender.com/api/health

# Test CORS
curl -i -X OPTIONS \
  -H "Origin: https://secure-lens-updated3-frontend.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  https://securelensupdated3.onrender.com/api/auth/login
```

### Verify Database Connection
```bash
# Backend logs should show successful database connection
# Check Render service logs for connection messages
```

---

## 6. TROUBLESHOOTING

### Frontend Not Connecting to Backend

**Problem**: 504 Gateway Timeout or CORS errors

**Solutions**:
1. Check `NEXT_PUBLIC_BACKEND_URL` environment variable in Vercel
2. Verify backend is running on Render: `https://securelensupdated3.onrender.com/api/health`
3. Check CORS configuration in backend: verify `FRONTEND_ORIGIN` includes your frontend URL
4. Check Render backend logs for connection errors

### Database Connection Issues

**Problem**: Backend crashes with database error

**Solutions**:
1. Verify `DATABASE_URL` is correctly set in Render environment
2. Ensure PostgreSQL service is running
3. Check database credentials match
4. Run migrations if needed:
   ```bash
   npx prisma migrate deploy
   npx prisma db push
   ```

### Redis Connection Issues

**Problem**: Queue/cache failures

**Solutions**:
1. Verify `REDIS_URL` is correctly set in Render environment
2. Ensure Redis service is running
3. Check network connectivity between services

### OAuth Redirect Loop

**Problem**: Login redirects infinitely

**Solutions**:
1. Verify callback URLs match exactly (case-sensitive)
2. Check `FRONTEND_URL` and `FRONTEND_ORIGIN` are set correctly
3. Verify OAuth credentials in GitHub/Google console

---

## 7. ENVIRONMENT FILES SUMMARY

| File | Purpose | Environment |
|------|---------|-------------|
| `.env` | Development configuration | Local |
| `.env.production` | Root production config | Prod (reference) |
| `apps/frontend/.env.production` | Frontend production env | Vercel |
| `apps/backend/.env.production` | Backend production env | Render |
| `vercel.json` | Vercel deployment config | Vercel |
| `render.yaml` | Render deployment config | Render |

---

## 8. QUICK START CHECKLIST

### Local Development
- [ ] Clone repository
- [ ] Run `pnpm install`
- [ ] Update `.env` with local DB/Redis URLs
- [ ] Run `pnpm run dev --filter @securelens/frontend`
- [ ] Run `pnpm run dev --filter @securelens/backend` (separate terminal)
- [ ] Access http://localhost:3000

### Vercel Deployment
- [ ] Connect GitHub to Vercel
- [ ] Import project
- [ ] Set environment variables
- [ ] Verify build succeeds
- [ ] Test frontend at https://secure-lens-updated3-frontend.vercel.app

### Render Deployment
- [ ] Create PostgreSQL database
- [ ] Create Redis cache
- [ ] Create web service for backend
- [ ] Set all environment variables
- [ ] Verify health check passes
- [ ] Test API at https://securelensupdated3.onrender.com/api/health

### OAuth Setup
- [ ] Configure GitHub OAuth
- [ ] Configure Google OAuth
- [ ] Test login flows

---

## 9. MONITORING & LOGS

### Vercel Logs
```bash
# View deployment logs
vercel logs --prod

# Stream real-time logs
vercel logs --prod --follow
```

### Render Logs
- Go to Render Dashboard → Select service → Logs tab
- View real-time output and deployment history

### Database Logs
- Render PostgreSQL: Dashboard → Database → Logs
- Check connection pooling and query performance

---

## 10. PRODUCTION BEST PRACTICES

- [ ] Update `JWT_SECRET` with strong random secret
- [ ] Enable HTTPS everywhere
- [ ] Set up database backups
- [ ] Configure monitoring and alerts
- [ ] Review CORS settings (whitelist only needed origins)
- [ ] Enable rate limiting on API
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure CDN for static assets
- [ ] Use environment-specific secrets
- [ ] Document deployment process

---

## Support

For issues or questions:
1. Check logs on Vercel/Render dashboards
2. Verify environment variables
3. Ensure services are running and healthy
4. Check database migrations completed
5. Review OAuth configuration

---

**Last Updated**: 2026-07-25
**Configuration**: Production (Vercel + Render) + Local Development
