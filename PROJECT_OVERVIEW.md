# SecureLens - Full Project Overview

## 📋 Project Summary

**SecureLens** is an AI-powered Security Intelligence Platform that orchestrates multiple open-source security scanners, correlates findings into a unified model, prioritizes risks, and provides an AI Security Copilot.

- **Type:** Monorepo (pnpm workspace)
- **Tech Stack:** TypeScript, NestJS, Next.js, PostgreSQL, Redis, BullMQ
- **Status:** MVP - 69% Complete (11/16 tasks)
- **Build Status:** Ready for compilation

---

## 🏗️ Architecture Overview

### Monorepo Structure
```
SecureLensUpdated1/
├── apps/
│   ├── frontend/          # Next.js 14 UI Dashboard
│   ├── backend/           # NestJS API Server
│   ├── worker/            # BullMQ Background Jobs
│   └── frontend.backup/   # Legacy frontend (archive)
├── packages/              # Shared libraries
├── scanner-images/        # Docker scanner containers
├── scripts/               # Setup & maintenance scripts
└── docs/                  # Documentation
```

---

## 🎯 Core Components

### 1. **Frontend (Next.js 14)**
- **Port:** 3000
- **Location:** `apps/frontend`
- **Key Features:**
  - Authentication (JWT, OAuth with GitHub/Google)
  - Dashboard with real-time scan status
  - Findings explorer and analytics
  - AI Copilot chat interface
  - Workspace management
  - Settings & profile management
  - Responsive Tailwind CSS UI

**Key Pages:**
- `/` - Landing page
- `/login`, `/register` - Authentication
- `/callback` - OAuth callback
- `/dashboard` - Main dashboard
- `/dashboard/live-scan` - Real-time scan monitoring
- `/dashboard/findings` - Vulnerability explorer
- `/dashboard/workspaces` - Workspace management
- `/dashboard/analytics` - Security analytics
- `/dashboard/ai-copilot` - AI chat interface
- `/dashboard/settings` - User settings
- `/dashboard/reports` - Report generation

**Components:**
- `components/auth/` - Login/register forms
- `components/dashboard/` - Dashboard UI components
- `components/sections/` - Landing page sections
- `components/layout/` - Navigation, footer, sidebar

**Services:**
- `services/scan.service.ts` - Scan API calls
- `services/dashboard.service.ts` - Dashboard data
- `lib/api.ts` - API client configuration

---

### 2. **Backend (NestJS)**
- **Port:** 4000
- **Location:** `apps/backend`
- **Database:** PostgreSQL (Port 5433)
- **Cache:** Redis (Port 6380)
- **ORM:** Prisma

**Modules:**

#### Core Modules
- **Auth Module** (`src/auth/`)
  - JWT authentication
  - OAuth strategies (GitHub, Google)
  - User registration/login
  - Password utilities
  - Routes: `/auth/login`, `/auth/register`, `/auth/github`, `/auth/google`

- **Workspaces Module** (`src/workspaces/`)
  - Workspace CRUD operations
  - Workspace statistics
  - File-based persistence for data
  - Routes: `/workspaces`

- **Scans Module** (`src/scans/`)
  - Scan creation and management
  - Scan status tracking
  - Result retrieval
  - Engine orchestration
  - Routes: `/scans`

#### Intelligence Modules
- **Scan Orchestrator** (`src/scan-orchestrator/`)
  - Manages scan jobs
  - Validates targets
  - Schedules security engines
  - Default engine selection per scan mode
  - **Key Service:** `ScanOrchestratorService`

- **Engine Abstraction Layer** (`src/engines/`)
  - Tool name abstraction (frontend never sees actual tool names)
  - Safe naming: "Asset Discovery", "Vulnerability Detection", etc.
  - SCANNER_ENGINES constants
  - TOOL_IMPLEMENTATION_MAP (backend-only)
  - **Key Service:** `EngineAbstractionService`

- **Findings Module** (`src/findings/`)
  - Unified finding storage
  - Finding search and filtering
  - Status updates
  - Routes: `/findings`

- **Result Parser** (`src/parsers/`)
  - **Supported Parsers:**
    - NucleiParser (JSON)
    - ZAPParser (XML)
    - SemgrepParser (JSON)
    - GitleaksParser (JSON)
    - TrivyParser (JSON)
    - TestsslParser (JSON)
    - NmapParser (JSON)
    - HttpxParser (JSON)
    - DnsxParser (JSON)
    - WhatwebParser (JSON)
  - Normalizes scanner outputs to UnifiedFinding format
  - Handles multiple output formats

- **Correlation Engine** (`src/correlation/`)
  - Deduplication using Levenshtein distance
  - Similarity scoring (85%+ threshold)
  - Finding merging and grouping
  - Related finding patterns
  - **Key Service:** `CorrelationEngineService`

- **Risk Intelligence Engine** (`src/risk/`)
  - Risk scoring algorithm:
    - Severity: 40%
    - Exploitability: 25%
    - Asset exposure: 20%
    - Correlation impact: 10%
    - Known CVE bonus: 5%
  - Risk level classification (Critical/High/Medium/Low/Info)
  - Risk trend analysis
  - **Key Service:** `RiskIntelligenceEngineService`

- **Security Scoring Engine** (`src/scoring/`)
  - Category-based scoring
  - Security grade calculation
  - Score trends and comparisons
  - Detailed reporting
  - **Key Service:** `SecurityScoringEngineService`

- **AI Copilot Module** (`src/ai/`)
  - Multiple AI provider support (OpenAI, Claude, others)
  - Finding explanation and remediation
  - Code example generation
  - Attack scenario explanation
  - Question answering
  - **Key Service:** `AICopilotService`

- **Dashboard Module** (`src/dashboard/`)
  - Dashboard metrics aggregation
  - Security score calculation
  - Finding statistics
  - Activity feed
  - Routes: `/dashboard`

- **Analytics Module** (`src/analytics/`)
  - Security metrics over time
  - Finding distribution
  - Category-based analytics
  - Routes: `/analytics`

- **Reports Module** (`src/reports/`)
  - Report generation
  - Report management
  - Routes: `/reports`

- **Notifications Module** (`src/notifications/`)
  - Notification creation/retrieval
  - Read status tracking
  - Routes: `/notifications`

#### Infrastructure
- **Queue Service** (`src/queue/`)
  - BullMQ integration
  - Queues:
    - Scan queue: Security scans
    - Parser queue: Result normalization
    - Correlation queue: Deduplication
    - Scoring queue: Risk scoring
  - Job retry with exponential backoff
  - Redis integration (port 6380)

- **Prisma Service** (`src/prisma/`)
  - Database connection management
  - Schema migrations
  - ORM integration

- **Real Data Integration Service** (`src/integration/`)
  - Pipeline execution coordination
  - Scan orchestration
  - Result processing

---

### 3. **Worker (BullMQ)**
- **Location:** `apps/worker`
- **Purpose:** Background job processing
- **Job Processors:**

#### Scan Processor
- Executes security scans
- Engines supported:
  - Nuclei (vulnerability detection)
  - OWASP ZAP (web app scanning)
  - Semgrep (SAST)
  - Trivy (dependency scanning)
  - Gitleaks (secret detection)
  - Whatweb (fingerprinting)
  - Testssl (SSL/TLS testing)
  - Nmap (port scanning)
  - Httpx (HTTP probing)
  - Dnsx (DNS resolution)
- Mock results for development/testing

#### Parser Processor
- Normalizes scanner outputs
- Maps formats to UnifiedFinding
- Risk level mapping
- Severity classification

#### Correlation Processor
- Deduplicates findings
- Groups related findings
- Correlation analysis

#### Scoring Processor
- Calculates risk scores
- Category scoring
- Aggregation

---

### 4. **Shared Packages**
Located in `packages/`:

- **findings-schema** (`packages/findings-schema/`)
  - UnifiedFinding interface
  - RawScannerResult interface
  - CorrelationResult interface
  - FindingStats interface
  - Category and severity enums
  - Validation helpers

- **shared-types** (`packages/shared-types/`)
  - Common TypeScript types

- **shared-utils** (`packages/shared-utils/`)
  - Common utilities and helpers

- **constants** (`packages/constants/`)
  - SCANNER_ENGINES configuration
  - TOOL_IMPLEMENTATION_MAP
  - Engine categories
  - Severity levels

- **validation** (`packages/validation/`)
  - Input validation helpers

- **logger** (`packages/logger/`)
  - Centralized logging

- **ui** (`packages/ui/`)
  - Shared UI components

---

### 5. **Scanner Images**
Located in `scanner-images/`:

Docker containers for each scanner:
- `nuclei/` - Vulnerability templates
- `zap/` - OWASP ZAP web app scanning
- `semgrep/` - Static code analysis
- `trivy/` - Container/dependency scanning
- `gitleaks/` - Secret detection
- `nmap/` - Network reconnaissance
- `testssl/` - SSL/TLS evaluation
- `whatweb/` - Web server fingerprinting
- `httpx/` - HTTP probing
- `dnsx/` - DNS resolution

Each container has:
- `Dockerfile` - Container definition
- `entrypoint.sh` - Startup script

---

## 📊 Data Flow

```
User Input
    ↓
Frontend (Next.js)
    ↓
Backend API (NestJS)
    ↓
Scan Orchestrator
    ↓
Queue Service (BullMQ)
    ├── Scan Processor → Docker Scanners
    ├── Parser Processor → Result Parser
    ├── Correlation Processor → Deduplication
    └── Scoring Processor → Risk Calculation
    ↓
Database (PostgreSQL)
    ↓
Frontend Dashboard
```

---

## 🔐 Authentication & Authorization

**Frontend:**
- JWT token-based auth
- OAuth 2.0 with GitHub/Google
- Session persistence in store
- Protected routes with JWT guard

**Backend:**
- JWT strategy validation
- OAuth strategy handlers
- Password hashing and validation
- Role-based access (implicit in workspace membership)

**Routes:**
- Public: `/auth/login`, `/auth/register`, `/auth/github`, `/auth/google`
- Protected: All `/dashboard/*`, `/scans`, `/findings`, etc.

---

## 💾 Database Schema (Prisma)

Key models:
- **User** - User accounts
- **Workspace** - Security workspaces
- **Scan** - Security scans
- **Finding** - Vulnerability findings
- **Report** - Scan reports
- **Notification** - User notifications

Database: PostgreSQL  
Connection: `postgresql://securelens:securelens@localhost:5432/securelens`

---

## 🔄 Scan Modes

1. **Website Scan**
   - HTTP/HTTPS endpoint scanning
   - Engines: Nuclei, ZAP, Httpx, Testssl, Whatweb, Dnsx, Nmap

2. **GitHub Scan**
   - Repository analysis
   - Engines: Gitleaks, Semgrep, Trivy

3. **Combined Scan**
   - Both website and code scanning
   - All engines

---

## 🚀 Getting Started

### Installation
```bash
# Install pnpm globally
npm i -g pnpm

# Install dependencies
pnpm install
```

### Backend
```bash
cd apps/backend
npm run dev:full  # Starts PostgreSQL, Redis, and NestJS
```

### Frontend
```bash
cd apps/frontend
npm run dev  # Starts Next.js dev server
```

### Access Points
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Swagger Docs:** http://localhost:4000/api
- **PostgreSQL:** localhost:5433 (user: securelens, pass: securelens)
- **Redis:** localhost:6380

---

## 📈 Project Status

### Completed (69%)
✅ Tool name abstraction layer  
✅ Scan orchestrator  
✅ BullMQ queue system  
✅ Unified findings schema  
✅ Result parsers (11 scanner types)  
✅ Correlation engine  
✅ Risk intelligence engine  
✅ Security scoring engine  
✅ Frontend dashboard  
✅ Authentication (JWT + OAuth)  
✅ Backend API structure  

### Pending (31%)
⏳ Advanced AI features  
⏳ Performance optimization  
⏳ Additional scanner integrations  
⏳ Enterprise features  
⏳ Comprehensive testing  

---

## 📁 Important Files & Configurations

- `.env` - Environment variables
- `.env.example` - Environment template
- `pnpm-workspace.yaml` - Workspace configuration
- `tsconfig.json` - TypeScript configuration
- `docker-compose.yml` - Docker services
- `prisma/schema.prisma` - Database schema

---

## 🔌 Environment Variables

Frontend:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Backend:
```
DATABASE_URL=postgresql://securelens:securelens@localhost:5432/securelens
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
OPENAI_API_KEY=xxx (optional)
CLAUDE_API_KEY=xxx (optional)
```

---

## 🛠️ Development Tips

1. **Hot Reload:** Backend and frontend support hot module reloading
2. **Swagger Docs:** Available at `http://localhost:4000/api`
3. **Database:** Migrations run automatically with `npm run dev:full`
4. **Logs:** Check Docker logs: `docker-compose logs -f`
5. **Testing:** Use test-phase1.sh for phase 1 testing

---

## 📚 Documentation Files

- `README.md` - Quick overview
- `QUICK_START.md` - Quick start guide
- `BACKEND_SETUP.md` - Backend setup details
- `IMPLEMENTATION_SUMMARY.md` - Implementation status
- `CONFIG_REQUIREMENTS.md` - Configuration requirements
- `RUN_APPLICATION.md` - Application running guide
- `OAUTH_SETUP.md` - OAuth configuration guide
- `FRONTEND_DATA_PERSISTENCE_FIX.md` - Frontend persistence fixes
- `SecureLens_ThreatVision_Reference.md` - Architecture reference

---

## 🤝 Key Technologies

**Frontend:**
- Next.js 14
- React 18
- TailwindCSS
- TypeScript
- Radix UI
- React Query
- React Hook Form

**Backend:**
- NestJS 10
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ
- Passport.js
- Class Validator

**Infrastructure:**
- Docker/Docker Compose
- pnpm workspaces
- Node.js 20+

---

## 📞 Support & Contribution

For questions or contributions, refer to the documentation files in the `/docs` directory or check the GitHub workflows in `.github/workflows/`.

---

**Last Updated:** July 20, 2026  
**Version:** 1.0.0 MVP
