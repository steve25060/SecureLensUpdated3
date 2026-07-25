# Vercel & Render Configuration Checklist

## Status: ✅ COMPLETE - Everything is configured!

Your project is **fully configured** for deployment. Here's what you need to do on each platform:

---

## 🟦 VERCEL (Frontend) - What You Need to Do

### 1. Create Vercel Project
- [ ] Go to https://vercel.com/new
- [ ] Import your GitHub repository
- [ ] Select "SecureLensUpdated1" project
- [ ] Framework preset: **Next.js** (auto-detected)

### 2. Build Settings (Already Configured in `vercel.json`)
- [ ] Root Directory: Leave empty or set to `./`
- [ ] Build Command: `pnpm run build --filter @securelens/frontend`
- [ ] Output Directory: `apps/frontend/.next`
- [ ] Install Command: `pnpm install --frozen-lockfile`
- [ ] ✅ **All set in vercel.json**

### 3. Environment Variables to Add in Vercel Dashboard
```
NEXT_PUBLIC_API_URL=https://securelensupdated3.onrender.com/api
NEXT_PUBLIC_BACKEND_URL=https://securelensupdated3.onrender.com
NODE_ENV=production
```

### 4. Domains
- [ ] Production domain: `secure-lens-updated3-frontend.vercel.app`
- [ ] Preview deployments auto-get subdomains
- [ ] Both are already configured in CORS

### 5. Advanced Settings (Optional)
- [ ] Enable "Serverless Function" if needed
- [ ] Set "Function Region" to closest location
- [ ] Enable "Gzip Compression" (default: on)
- [ ] Enable "Brotli Compression" (recommended)

### 6. Deploy
- [ ] Click "Deploy" button
- [ ] Vercel will auto-deploy on GitHub push

---

## 🟥 RENDER (Backend) - What You Need to Do

### 1. Create PostgreSQL Database
- [ ] Go to https://dashboard.render.com/new/database/postgres
- [ ] Name: `securelens-db`
- [ ] Database: `securelens`
- [ ] User: `securelens`
- [ ] Region: **Oregon** (or your closest region)
- [ ] Plan: **Standard** (for production)
- [ ] Copy the "Internal Database URL" (use this in backend service)
  - Format: `postgresql://username:password@host:5432/dbname`

### 2. Create Redis Cache
- [ ] Go to https://dashboard.render.com/new/redis
- [ ] Name: `securelens-redis`
- [ ] Region: **Same as database** (Oregon)
- [ ] Plan: **Standard** (for production)
- [ ] Copy the Redis connection URL
  - Format: `redis://username:password@hostname:6379`

### 3. Create Web Service for Backend
- [ ] Go to https://dashboard.render.com/new/webservice
- [ ] Choose "GitHub"
- [ ] Select your repository
- [ ] Settings:
  - Name: `securelens-backend`
  - Root Directory: Leave empty
  - Runtime: **Node**
  - Region: **Oregon** (same as DB/Redis)
  - Build Command: `pnpm install && pnpm run build --filter @securelens/backend...`
  - Start Command: `node apps/backend/dist/main.js`
  - Plan: **Standard** or **Professional**
- [ ] ✅ **All configured in render.yaml**

### 4. Set Environment Variables in Render
Add these in service's Environment tab:

```
# Core
NODE_ENV=production
PORT=4000
BACKEND_URL=https://securelensupdated3.onrender.com

# Database (from PostgreSQL service)
DATABASE_URL=postgresql://username:password@hostname:5432/dbname

# Redis (from Redis service)
REDIS_URL=redis://username:password@hostname:6379

# JWT
JWT_SECRET=your_production_secret_32_chars_min
JWT_EXPIRATION=24h

# Frontend Configuration
FRONTEND_ORIGIN=https://secure-lens-updated3-frontend.vercel.app,https://secure-lens-updated3-frontend-ou5djyntz.vercel.app
FRONTEND_URL=https://secure-lens-updated3-frontend.vercel.app

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=https://securelensupdated3.onrender.com/api/auth/github/callback

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://securelensupdated3.onrender.com/api/auth/google/callback

# Logging
LOG_LEVEL=warn
ENABLE_PRETTY_LOGS=false

# Scanners
SCANNER_TIMEOUT=300000
NUCLEI_ENABLED=true
TRIVY_ENABLED=true
ZAP_ENABLED=false
SEMGREP_ENABLED=true
GITLEAKS_ENABLED=true
NMAP_ENABLED=false
WHATWEB_ENABLED=true
TESTSSL_ENABLED=true

# Worker
WORKER_CONCURRENCY=10
WORKER_TIMEOUT=600000
WORKER_PROCESS_INTERVAL=5000
```

### 5. Configure Health Check
- [ ] Health Check Path: `/api/health`
- [ ] Health Check Interval: 10 minutes

### 6. Auto-Deploy Settings
- [ ] Enable "Auto-Deploy": ON
- [ ] Deploy Branch: `main`
- [ ] Deploy on push to main

### 7. Deploy
- [ ] Click "Create Web Service"
- [ ] Render will auto-deploy from GitHub

---

## 🔐 OAuth Configuration (GitHub & Google)

### GitHub OAuth Setup

1. **Create OAuth App on GitHub**
   - Go to https://github.com/settings/developers
   - Click "OAuth Apps" → "New OAuth App"
   - Fill in:
     - **Application name**: SecureLens
     - **Homepage URL**: `https://secure-lens-updated3-frontend.vercel.app`
     - **Authorization callback URL**: `https://securelensupdated3.onrender.com/api/auth/github/callback`
   - Click "Register Application"

2. **Copy Credentials**
   - Copy **Client ID**
   - Click "Generate a new client secret" → Copy **Client Secret**

3. **Add to Render Environment**
   - Set `GITHUB_CLIENT_ID`
   - Set `GITHUB_CLIENT_SECRET`

### Google OAuth Setup

1. **Create OAuth Credentials on Google Cloud**
   - Go to https://console.cloud.google.com/
   - Create new project or select existing
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Select "Web application"
   - Add Authorized JavaScript origins:
     - `https://secure-lens-updated3-frontend.vercel.app`
   - Add Authorized redirect URIs:
     - `https://securelensupdated3.onrender.com/api/auth/google/callback`
   - Click "Create"

2. **Copy Credentials**
   - Copy **Client ID**
   - Copy **Client Secret**

3. **Add to Render Environment**
   - Set `GOOGLE_CLIENT_ID`
   - Set `GOOGLE_CLIENT_SECRET`

---

## ✨ What's Already Configured in Your Project

### Files Created ✅
1. `.env` - Local development (localhost)
2. `.env.production` - Production reference
3. `apps/frontend/.env.production` - Vercel environment
4. `apps/backend/.env.production` - Render environment
5. `vercel.json` - Vercel deployment config
6. `render.yaml` - Render deployment config

### Code Changes ✅
1. `apps/frontend/next.config.js` - Smart API routing
2. `apps/frontend/lib/api.ts` - Production-ready API client
3. `apps/backend/src/main.ts` - CORS & logging configured

### Features ✅
- ✅ Environment-based URL switching
- ✅ CORS for both production and preview domains
- ✅ OAuth callbacks configured
- ✅ Database & Redis ready
- ✅ Build commands optimized
- ✅ Health checks set up
- ✅ Logging levels configured
- ✅ Worker concurrency tuned

---

## 🚀 Deployment Order

### Step 1: Local Testing (Do This First!)
```bash
pnpm install
pnpm run dev --filter @securelens/frontend
pnpm run dev --filter @securelens/backend
# Test at http://localhost:3000
```

### Step 2: Deploy Backend to Render
1. Create PostgreSQL database
2. Create Redis cache
3. Create Web Service
4. Set environment variables
5. Verify health check: https://securelensupdated3.onrender.com/api/health

### Step 3: Deploy Frontend to Vercel
1. Import GitHub repo
2. Set environment variables
3. Verify build succeeds
4. Test at https://secure-lens-updated3-frontend.vercel.app

### Step 4: Test Integration
1. Verify frontend loads
2. Test login (email/password)
3. Test OAuth (GitHub/Google)
4. Test API calls
5. Verify database connectivity

---

## 🔍 Verification Checklist

### After Vercel Deployment
- [ ] Frontend builds successfully
- [ ] Visit https://secure-lens-updated3-frontend.vercel.app
- [ ] Check browser console - no CORS errors
- [ ] Environment variables present
- [ ] API calls route to Render backend

### After Render Deployment
- [ ] Backend starts without errors
- [ ] Health check passes: https://securelensupdated3.onrender.com/api/health
- [ ] Database connected
- [ ] Redis cache connected
- [ ] CORS headers present

### End-to-End Testing
- [ ] Frontend loads
- [ ] Register new user
- [ ] Login with email/password
- [ ] GitHub OAuth redirect works
- [ ] Google OAuth redirect works
- [ ] Dashboard loads data from API
- [ ] Create scan
- [ ] View scan results
- [ ] No 504 or CORS errors

---

## 📊 Architecture After Deployment

```
Users
  ↓
┌─────────────────────────────────────┐
│ Vercel (Frontend)                   │
│ secure-lens-updated3-frontend       │
│ URL: vercel.app                     │
└──────────────┬──────────────────────┘
               │ HTTPS + CORS
               ↓
┌─────────────────────────────────────┐
│ Render (Backend)                    │
│ securelens-backend                  │
│ URL: onrender.com                   │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        ↓             ↓
    ┌────────┐   ┌────────┐
    │PostgreSQL   │ Redis  │
    │(Database)   │(Cache) │
    └────────┘   └────────┘
```

---

## 🛟 Troubleshooting

### Frontend 504 Errors
- Check Render backend is running
- Verify `NEXT_PUBLIC_BACKEND_URL` in Vercel
- Check CORS configuration in backend

### CORS Errors
- Verify `FRONTEND_ORIGIN` in Render includes frontend URL
- Check preflight requests in browser dev tools
- Ensure `enableCors()` called in backend

### Database Connection Issues
- Verify `DATABASE_URL` in Render
- Check PostgreSQL service is running
- Ensure network connectivity between services

### Redis Connection Issues
- Verify `REDIS_URL` in Render
- Check Redis service is running
- Verify format: `redis://user:pass@host:6379`

### OAuth Redirects
- Verify callback URLs match exactly (case-sensitive)
- Check `FRONTEND_URL` and `FRONTEND_ORIGIN`
- Test with incognito/private browser

---

## 📝 Summary

| Component | Platform | Status | URL |
|-----------|----------|--------|-----|
| Frontend | Vercel | ✅ Ready | `secure-lens-updated3-frontend.vercel.app` |
| Backend | Render | ✅ Ready | `securelensupdated3.onrender.com` |
| Database | Render PostgreSQL | ✅ Ready | (Render dashboard) |
| Cache | Render Redis | ✅ Ready | (Render dashboard) |
| Configuration | Project | ✅ Complete | `.env`, `vercel.json`, `render.yaml` |

**Everything is configured and ready to deploy! 🎉**

---

**Last Updated**: 2026-07-25
**Status**: Ready for Production
**Next Step**: Follow deployment order above
