#!/bin/bash

# Run Prisma migrations in Railway environment
# This script should be executed after deployment

echo "🔄 Running Prisma migrations..."
cd apps/backend

# Run migrations
npx prisma migrate deploy

echo "✅ Migrations completed successfully!"
