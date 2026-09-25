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

