-- Seed test user for production testing
INSERT INTO users (id, email, name, "passwordHash", role, organization, timezone, "createdAt", "updatedAt")
VALUES (
  'test-user-1',
  'test@securelens.com',
  'Test User',
  'scrypt:5b9c15a5c7b9f3e8a2d6c4f1b8e9a5d7:a8f3e2c9d5b1f4a7e6c8d9a2b3f5e8c1d4a6b8f9e2c5d7a9b1c3e5f7a8b9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2',
  'USER',
  'Test Organization',
  'UTC',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  "passwordHash" = 'scrypt:5b9c15a5c7b9f3e8a2d6c4f1b8e9a5d7:a8f3e2c9d5b1f4a7e6c8d9a2b3f5e8c1d4a6b8f9e2c5d7a9b1c3e5f7a8b9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2',
  "updatedAt" = NOW();
