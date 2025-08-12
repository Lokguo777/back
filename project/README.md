# Carbon Management API

A Node.js Express TypeScript API for carbon data management and review system.

## Features

- JWT Authentication
- Role-based access control
- Carbon data CRUD operations
- Review and approval workflow
- PostgreSQL with Drizzle ORM
- Docker support

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp env.example .env
```

3. Set up database:
```bash
npm run db:generate
npm run db:migrate
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/carbon` - Create carbon data
- `GET /api/carbon/my-data` - Get user's data
- `GET /api/admin/pending-reviews` - Get pending reviews

## Docker

```bash
docker-compose -f docker/docker-compose.yml up -d
``` 