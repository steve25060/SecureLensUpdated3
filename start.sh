#!/bin/bash

# SecureLens Universal Start Script
# Detects which service to run based on environment or service name

# Default to backend
SERVICE=${SERVICE:-backend}
PORT=${PORT:-4000}

echo "================================================"
echo "Starting SecureLens - Service: $SERVICE"
echo "================================================"

if [ "$SERVICE" = "frontend" ]; then
  echo "🚀 Starting Frontend (Next.js)..."
  cd apps/frontend
  npm run start
elif [ "$SERVICE" = "backend" ]; then
  echo "🚀 Starting Backend (NestJS)..."
  node apps/backend/dist/main.js
else
  # Try to auto-detect based on hostname or service ID
  if [ -n "$RAILWAY_SERVICE_NAME" ]; then
    if [[ "$RAILWAY_SERVICE_NAME" == *"frontend"* ]] || [[ "$RAILWAY_SERVICE_NAME" == "diligent-surprise" ]]; then
      echo "🚀 Detected Frontend Service (${RAILWAY_SERVICE_NAME})"
      cd apps/frontend
      npm run start
    else
      echo "🚀 Detected Backend Service (${RAILWAY_SERVICE_NAME})"
      node apps/backend/dist/main.js
    fi
  else
    # Default to backend
    echo "🚀 Defaulting to Backend"
    node apps/backend/dist/main.js
  fi
fi
