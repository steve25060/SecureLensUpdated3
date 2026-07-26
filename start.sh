#!/bin/bash

# SecureLens Universal Start Script
# Detects which service to run based on environment variables

# Check explicit service flag first
if [ "$FRONTEND_SERVICE" = "true" ]; then
  echo "🚀 Starting Frontend (Next.js) - FRONTEND_SERVICE=true"
  cd apps/frontend
  pnpm start
  exit $?
fi

# Fall back to service name detection
SERVICE_NAME=${RAILWAY_SERVICE_NAME:-unknown}

echo "================================================"
echo "Starting SecureLens Service: $SERVICE_NAME"
echo "================================================"

if [[ "$SERVICE_NAME" == *"diligent-surprise"* ]] || [[ "$SERVICE_NAME" == *"frontend"* ]]; then
  echo "🚀 Starting Frontend (Next.js)..."
  cd apps/frontend
  pnpm start
elif [[ "$SERVICE_NAME" == *"scintillating-strength"* ]] || [[ "$SERVICE_NAME" == *"backend"* ]]; then
  echo "🚀 Starting Backend (NestJS)..."
  node apps/backend/dist/main.js
else
  # Default to backend if unsure
  echo "⚠️  Service unknown: $SERVICE_NAME, defaulting to Backend"
  node apps/backend/dist/main.js
fi
