# Lead Tracker

A full-stack application for creating, searching, sorting, filtering, and updating leads.

**Live application:** [lead-tracker-kappa-inky.vercel.app](https://lead-tracker-kappa-inky.vercel.app/)

**Repository:** [github.com/Prasoon-Upadhyay/lead-tracker](https://github.com/Prasoon-Upadhyay/lead-tracker)

## Features

- Create leads with name, email, phone, and status.
- List leads with server-side pagination, search, status filtering, and sorting.
- Update a lead's status from the table.
- Protect the API with CORS, Helmet security headers, and rate limiting.

## Architecture

The repository contains independently deployable frontend and backend applications.

```text
frontend/                         backend/
+-- src/app/leads/                +-- src/app/leads/
|   +-- leads.screen.tsx           |   +-- leads.router.ts
|   +-- leads-table.components.tsx |   +-- leads.controller.ts
|   +-- leads-form.components.tsx  |   +-- leads.service.ts
|   +-- leads.data.ts              |   +-- leads.db.ts
+-- src/common/                    |   +-- leads.schema.ts
+-- src/app/app.providers.tsx      +-- src/common/
```

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Axios, TanStack Query and Table, hosted on Vercel.
- **Backend:** Node.js, Express 5, TypeScript, Zod, Prisma, Helmet, and express-rate-limit, hosted on Render.
- **Database:** PostgreSQL, hosted on Supabase.

The backend is feature-first: routing, request handling, validation, service logic, and database access for leads live together. Shared middleware and database helpers live in `backend/src/common`.



## API

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Health check |
| `GET` | `/api/v1/leads` | List leads; supports `search`, `status`, `page`, `limit`, and `sort` |
| `POST` | `/api/v1/leads` | Create a lead |
| `PATCH` | `/api/v1/leads/:id/status` | Update a lead status |

Sort values use a leading `-` for descending order, for example `sort=-createdAt`.

## Local setup

### Prerequisites

- Node.js 22 or later
- PostgreSQL, or a Supabase Postgres database


### Backend

```powershell
cd backend
npm ci
npx prisma generate
npx prisma migrate dev
npm run dev
```

> [!IMPORTANT]
> Create the required `.env` files from the provided `.env.example` templates and configure the environment variables before starting the applications.


The API runs at `http://localhost:4000`.

### Frontend

In another terminal:

```powershell
cd frontend
npm ci
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Testing and checks

```bash
cd backend
npm run lint
npm run build
npm test
```

The API integration suite uses Vitest and Supertest. It covers lead creation, validation, duplicate emails, listing, searching, filtering, pagination, status updates, missing leads, and unknown routes.

For the frontend:

```bash
cd frontend
npm run lint
npm run build
```

## Deployment Steps

- **Frontend:** deployed to Vercel.
  - Build Command: `npm run build`
- **Backend:** deployed to Render.
  - Build command: `npm ci && npx prisma generate && npm run build`
  - Start command: `npm start`
- **Database:** hosted on Supabase PostgreSQL.

## Trade-offs

- Filtering, sorting, and pagination run on the server so the UI remains consistent as the dataset grows.
- The project uses one feature and one screen, so route-level code splitting would add complexity without a practical benefit.
- Native browser form validation improves immediate feedback; Zod validation on the backend remains the authoritative validation layer.
- The rate limiter uses in-memory storage, which is appropriate for this single-instance assignment deployment but not for horizontally scaled production services.

## Future improvements

- Add authentication and role-based access control.
- Use Redis-backed rate limiting for multi-instance deployments.
- Use Redis for caching, if rate of read operations increase.
- Add structured request logging and error monitoring.
- Add frontend component tests and end-to-end browser coverage.

## Future feature ideas

- Add CSV import for creating leads in bulk.
- Expand the `leads` entity with additional metadata and explore an agentic lead-outreach workflow with RAG.
