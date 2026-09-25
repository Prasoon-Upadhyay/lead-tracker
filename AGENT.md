# AI Assistance Record

## Tool and Role

- **Tool:** OpenAI Codex
- **Role:** Requested boilerplate, pre-commit build validation, and code review.
- **Developer responsibility:** Stack, architecture, database design, naming, feature behavior, and final code decisions. AI output is reviewed and adjusted before use.

### Main Review Prompt

> You are a senior-level MERN-stack reviewer. Before each commit, review the implementation for correctness, maintainability, naming consistency, security basics, and assignment alignment. Run a build check before confirming that a commit is ready. Generate only requested boilerplate; do not make product, architecture, or implementation decisions without developer direction.

## Architecture

The backend uses feature-first organization:

```text
backend/src/
├── app/
│   └── leads/
│       ├── leads.router.ts
│       ├── leads.controller.ts
│       ├── leads.service.ts
│       ├── leads.db.ts
│       ├── leads.schema.ts
│       ├── leads.types.ts
│       └── leads.utils.ts
└── common/
    ├── middleware/
    ├── types/
    ├── literals.ts
    └── prisma.ts
```

The developer independently selected feature-first organization because it keeps each domain's HTTP, business, validation, and database code co-located as the application grows. Shared concerns remain in `src/common`. Global `controllers`, `routes`, and `services` folders are not used. AI was used only to stress-test the alternatives; it did not make this architecture decision.

### Naming-Convention Review Prompt

> Act as a senior full-stack reviewer. Compare a feature-first structure (`src/app/leads/leads.router.ts`, `leads.controller.ts`, `leads.service.ts`, `leads.db.ts`) with a layer-first structure (`src/app/controllers/leads.ts`, `src/app/routes/leads.ts`, `src/app/services/leads.ts`) for a small Lead Tracker that may grow. Explain the trade-offs, maintainability implications, and common production usage. Do not change code or make the decision; provide a concise recommendation for developer review. The final architecture decision will be provided after.

## Commit Validation

Before marking a commit ready, run the applicable build command and report its result. Do not stage, commit, push, create migrations, or change environment files unless explicitly requested.

## Testing

The developer requested API test-coverage planning and boilerplate test cases for the Lead API. Codex generated the initial Vitest/Supertest test scaffolding; the developer reviews the selected scenarios, prepares the dedicated test database, and validates the final test results.

### Test-Coverage Prompt

> Propose focused API integration coverage for the Lead Tracker. Cover health, lead creation, input validation, duplicate-email handling, list/search/filter/pagination, status updates, missing leads, and unknown routes. Keep the suite focused on externally observable API behavior; do not add low-value duplicate tests without a concrete reason.

## Frontend Shell

The developer requested a basic React application shell for the Leads feature: Tailwind styling, Roboto, Axios and TanStack Query providers, a semantic reusable table, and TanStack Table with server-side sorting. The developer selected the feature structure: `src/app/leads` for leads screen, table, types, and utilities; `src/common` for shared Axios and table components.
