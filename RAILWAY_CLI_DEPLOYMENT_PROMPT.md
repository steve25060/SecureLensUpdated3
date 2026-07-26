# SecureLens Railway CLI Deployment Prompt for Kiro

This document provides the complete deployment instructions for deploying SecureLens to Railway using the Railway CLI integrated through Kiro CLI.

---

## Pre-Deployment Checklist

Before running the deployment command, ensure you have:

- [ ] Railway CLI installed on your laptop (`railway login` successful)
- [ ] Project is pushed to GitHub
- [ ] All local changes committed to git
- [ ] `.env.production` files are properly configured with local URLs
- [ ] Node.js >= 20.0.0 installed
- [ ] pnpm installed globally (`npm install -g pnpm`)

---

## Project Structure

```
SecureLensUpdated1/
├── apps/
│   ├── backend/          (NestJS API server)
│   ├── frontend/         (Next.js web app)
│   └── worker/           (Background job processor)
├── packages/             (Shared libraries)
│   ├── constants/
│   ├── findings-schema/
│   ├── shared-types/
│   ├── shared-utils/
│   ├── validation/
│   ├── logger/
│   └── ui/
├── pnpm-workspace.yaml   (monorepo configuration)
├── package.json          (root package.json)
└── railway.toml          (Railway deployment config)
```

**Stack:**
- Monorepo: pnpm workspace
- Backend: NestJS (Node.js)
- Frontend: Next.js (React)
- Database: PostgreSQL
- Cache: Redis
- Package Manager: pnpm

---

## Deployment Command for Kiro CLI

Use this command to deploy SecureLens to Railway through Kiro CLI:

```bash
kiro chat "Deploy SecureLens to Railway with the following specifications:

PROJECT: SecureLensUpdated1 monorepo (pnpm workspace)
BACKEND_PATH: apps/backend
FRONTEND_PATH: apps/frontend
PACKAGE_MANAGER: pnpm

SERVICES_TO_CREATE:
1. Backend API Service
   - Runtime: Node.js
   - Build Command: pnpm install --frozen-lockfile && cd apps/backend && pnpm run build
   - Start Command: node apps/backend/dist/main.js
   - Port: 4000 (from PORT env var)
   - Environment: production

2. PostgreSQL Database Service
   - Create auto-managed PostgreSQL instance
   - Version: 15+
   - Auto-generate DATABASE_URL

3. Redis Cache Service
   - Create auto-managed Redis instance
   - Version: 7+
   - Auto-generate REDIS_URL

ENVIRONMENT_VARIABLES_TO_SET:
Backend (.env):
  - NODE_ENV=production
  - PORT=4000
  - JWT_SECRET=<generate_secure_32_char_key>
  - JWT_EXPIRATION=24h
  - LOG_LEVEL=warn
  - ENABLE_PRETTY_LOGS=false
  - FRONTEND_ORIGIN=http://localhost:3000,http://localhost:3001
  - FRONTEND_URL=http://localhost:3000
  - SCANNER_TIMEOUT=300000
  - NUCLEI_ENABLED=true
  - TRIVY_ENABLED=true
  - ZAP_ENABLED=false
  - SEMGREP_ENABLED=true
  - GITLEAKS_ENABLED=true
  - NMAP_ENABLED=false
  - WHATWEB_ENABLED=true
  - TESTSSL_ENABLED=true
  - WORKER_CONCURRENCY=10
  - WORKER_TIMEOUT=600000
  - WORKER_PROCESS_INTERVAL=5000
  - (Optional) GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL
  - (Optional) GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL

DATABASE_URL and REDIS_URL: Auto-linked from services

POST_DEPLOYMENT_STEPS:
1. Run database migrations: npx prisma migrate deploy
2. Test health endpoint: GET /api/health
3. Verify CORS configuration
4. Test API endpoints

DEPLOYMENT_STRATEGY:
- Use Railway's built-in GitHub integration for automatic deployments
- Enable automatic deployments on main branch push
- Configure rollback policy: on_failure
- Health check: /api/health endpoint

MONOREPO_BUILD_OPTIMIZATION:
- Use pnpm's workspace filtering for efficient builds
- Only build backend during deployment (not frontend)
- Cache node_modules between deployments
- Use pnpm's frozen lockfile for consistency

HEALTH_CHECK_CONFIG:
- Endpoint: /api/health
- Timeout: 30 seconds
- Restart Policy: on_failure (max retries: 5)

DOMAIN_CONFIGURATION:
- Generate Railway domain (e.g., securelens-backend-prod.railway.app)
- Update backend URLs after deployment
- Configure CORS for final frontend URL

DATABASE_MIGRATION:
- Run Prisma migrations post-deployment
- Database is auto-provisioned by Railway
- Connect via auto-generated DATABASE_URL

COMPLETION_CRITERIA:
✓ Backend service deployed and running
✓ PostgreSQL database connected and migrations applied
✓ Redis cache operational
✓ Health endpoint returns 200 OK
✓ API endpoints responding correctly
✓ CORS configured for frontend origin
✓ Environment variables all set correctly

START_DEPLOYMENT_NOW: Execute railway link, configure services, deploy backend"
```

---

## Alternative: Step-by-Step Railway CLI Commands

If you prefer to run Railway CLI commands directly, use this sequence:

### 1. Initialize Railway Project

```bash
cd /home/stavan/SecureLensUpdated1
railway login
railway init
# Select/create project: SecureLens-Production
```

### 2. Add Services

```bash
# Add PostgreSQL
railway add
# Select: PostgreSQL

# Add Redis
railway add
# Select: Redis
```

### 3. Set Environment Variables

```bash
railway variables set NODE_ENV=production
railway variables set PORT=4000
railway variables set JWT_SECRET="your_secure_32_char_jwt_secret_here"
railway variables set JWT_EXPIRATION=24h
railway variables set LOG_LEVEL=warn
railway variables set ENABLE_PRETTY_LOGS=false
railway variables set FRONTEND_ORIGIN=http://localhost:3000,http://localhost:3001
railway variables set FRONTEND_URL=http://localhost:3000
railway variables set SCANNER_TIMEOUT=300000
railway variables set NUCLEI_ENABLED=true
railway variables set TRIVY_ENABLED=true
railway variables set ZAP_ENABLED=false
railway variables set SEMGREP_ENABLED=true
railway variables set GITLEAKS_ENABLED=true
railway variables set NMAP_ENABLED=false
railway variables set WHATWEB_ENABLED=true
railway variables set TESTSSL_ENABLED=true
railway variables set WORKER_CONCURRENCY=10
railway variables set WORKER_TIMEOUT=600000
railway variables set WORKER_PROCESS_INTERVAL=5000
```

### 4. Deploy Backend

```bash
cd apps/backend
railway up --service backend
```

### 5. Run Database Migrations

```bash
railway shell
cd apps/backend
npx prisma migrate deploy
exit
```

### 6. Get Service URLs

```bash
railway variables get
# Copy the DATABASE_URL and REDIS_URL for reference
# Get your backend URL from Railway dashboard
```

---

## Deployment Configuration Files

### Current railway.toml

```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "node apps/backend/dist/main.js"
healthcheckPath = "/api/health"
healthcheckTimeout = 30
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 5
```

### Backend Build Process

**Build Command:**
```bash
pnpm install --frozen-lockfile && cd apps/backend && pnpm run build
```

**Build Steps:**
1. Install all monorepo dependencies
2. Build shared packages (constants, findings-schema, shared-types, shared-utils)
3. Compile TypeScript backend code to JavaScript
4. Generate Prisma client
5. Output to `apps/backend/dist/`

**Start Command:**
```bash
node apps/backend/dist/main.js
```

---

## Environment Configuration

### Local Development (Current)
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`
- Database: `localhost:5433`
- Redis: `localhost:6380`

### Production (After Railway Deployment)
Update these after getting your Railway domain:

```
NEXT_PUBLIC_API_URL=https://<your-railway-backend-url>/api
NEXT_PUBLIC_BACKEND_URL=https://<your-railway-backend-url>
FRONTEND_ORIGIN=https://<your-railway-backend-url>  # Update CORS
```

---

## Database Setup

### PostgreSQL

- **Auto-provisioned by Railway**
- **Connection:** Via `DATABASE_URL` environment variable
- **Migrations:** Use `npx prisma migrate deploy`
- **Schema:** Defined in `apps/backend/prisma/schema.prisma`

**To run migrations after deployment:**
```bash
railway shell
cd apps/backend
npx prisma migrate deploy
```

### Redis

- **Auto-provisioned by Railway**
- **Connection:** Via `REDIS_URL` environment variable
- **Purpose:** Session management and caching
- **Auto-linked to backend service**

---

## Monitoring & Troubleshooting

### Health Check

Test the deployment:
```bash
curl https://<your-railway-backend-url>/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-07-26T10:55:00.000Z",
  "uptime": 1234.56,
  "environment": "production"
}
```

### Common Issues

**1. Build Fails (Missing Dependencies)**
- Ensure pnpm-lock.yaml is committed
- Run `pnpm install` locally to update lock file
- Commit and push changes

**2. Database Connection Error**
- Verify DATABASE_URL is auto-set by Railway
- Check Prisma schema: `apps/backend/prisma/schema.prisma`
- Ensure migrations run: `npx prisma migrate deploy`

**3. Port Binding Error**
- Backend must listen on `process.env.PORT` (Railway assigns dynamically)
- Check `apps/backend/src/main.ts` line 58
- Should use `const port = process.env.PORT || 4000`

**4. CORS Error**
- Verify `FRONTEND_ORIGIN` matches exact frontend URL
- Check `apps/backend/src/main.ts` CORS configuration
- Update after frontend deployment URL is known

**5. Memory Issues**
- Check worker concurrency: `WORKER_CONCURRENCY=5-10`
- Reduce scanner timeout if needed
- Check Railway logs for out-of-memory errors

### View Logs

```bash
railway logs
# or via Railway dashboard
```

### SSH Access

```bash
railway shell
# Run commands directly on deployed service
```

---

## Post-Deployment Configuration

### 1. Update Frontend (if deployed separately)

Update Vercel/Frontend environment:
```
NEXT_PUBLIC_API_URL=https://<railway-backend-url>/api
NEXT_PUBLIC_BACKEND_URL=https://<railway-backend-url>
```

### 2. Configure OAuth (Optional)

Update environment variables with OAuth provider credentials:
```bash
railway variables set GITHUB_CLIENT_ID=<your_id>
railway variables set GITHUB_CLIENT_SECRET=<your_secret>
railway variables set GITHUB_CALLBACK_URL=https://<your-railway-url>/api/auth/github/callback

railway variables set GOOGLE_CLIENT_ID=<your_id>
railway variables set GOOGLE_CLIENT_SECRET=<your_secret>
railway variables set GOOGLE_CALLBACK_URL=https://<your-railway-url>/api/auth/google/callback
```

### 3. Custom Domain (Optional)

In Railway dashboard:
1. Go to Project → Settings → Domains
2. Add custom domain (e.g., `api.yourdomain.com`)
3. Update DNS records as instructed
4. Update FRONTEND_ORIGIN if using custom domain

---

## Rollback Instructions

```bash
# View deployment history
railway deployments

# Rollback to previous deployment
railway rollback <deployment-id>
```

Or via Railway dashboard:
1. Navigate to Deployments
2. Select previous deployment
3. Click "Redeploy"

---

## Important Notes

⚠️ **CORS Configuration:** After deployment, update `FRONTEND_ORIGIN` to match your actual frontend URL
⚠️ **JWT_SECRET:** Generate a strong, random 32+ character secret
⚠️ **Database:** Ensure migrations are run after first deployment
⚠️ **Health Check:** Verify `/api/health` returns 200 OK
⚠️ **Logs:** Monitor for errors during first 24 hours

---

## Next Steps After Deployment

1. ✓ Verify backend health endpoint
2. ✓ Test API endpoints from Postman/Frontend
3. ✓ Monitor Railway logs for errors
4. ✓ Update frontend with correct backend URL
5. ✓ Redeploy frontend with new backend URL
6. ✓ Test end-to-end authentication flow
7. ✓ Configure OAuth if needed
8. ✓ Set up custom domain (optional)

---

## Quick Reference

| Component | Value | Status |
|-----------|-------|--------|
| **Backend Framework** | NestJS v11 | ✓ Ready |
| **Frontend Framework** | Next.js v16 | ✓ Ready |
| **Package Manager** | pnpm | ✓ Ready |
| **Database** | PostgreSQL 15+ | Auto-provisioned |
| **Cache** | Redis 7+ | Auto-provisioned |
| **Node Version** | >=20.0.0 | ✓ Required |
| **Build Tool** | nixpacks | ✓ Railway default |
| **API Port** | 4000 | ✓ Configured |
| **Health Endpoint** | /api/health | ✓ Active |

---

## Support & Documentation

- **Railway Docs:** https://docs.railway.app
- **NestJS Docs:** https://docs.nestjs.com
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **pnpm Docs:** https://pnpm.io

---

**Generated:** 2026-07-26 10:55 IST
**Project:** SecureLens v1.0.0
**Deployment Target:** Railway.app
**Status:** Ready for deployment
