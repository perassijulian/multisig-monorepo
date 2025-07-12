# 🧠 Backend – Multisig Wallet dApp

This is the backend service for the Multisig Wallet dApp. It provides RESTful endpoints to manage user-linked multisig accounts, wallet deployments, and off-chain logic.

---

## 📦 Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL** (or SQLite for dev)
- **Domain-Driven Architecture**
- Optional: Redis, JWT, BullMQ (background jobs), Viem

---

## 📁 Project Structure

│
├── src/
│ ├── app/ # Express app setup & middleware
│ │ ├── index.ts # Create app & apply routes
│ │ ├── middlewares/ # Error handling, CORS, logging
│ │ ├── routes/ # Express routes only
│ │ └── validators/ # Input validation schemas (Zod/Yup)
│ │
│ ├── domain/ # Business logic, use-cases
│ │ ├── multisig/ # Use-cases, services, interfaces
│ │ └── user/ # Future user-related logic
│ │
│ ├── infra/ # Infra: DB, external APIs, job queues
│ │ ├── db/ # ORM (Prisma), schemas, migrations
│ │ ├── http/ # Fetch clients, webhooks
│ │ └── logger/ # Winston, Pino, etc.
│ │
│ ├── config/ # Env vars, global settings
│ ├── types/ # Global/shared types
│ └── index.ts # Bootstrap server
│
├── tests/ # Unit/integration tests
│
├── scripts/ # CLI utils or dev tooling
│
├── .env
├── package.json
└── tsconfig.json # Use TypeScript for scale

---

## 💡 Design Decisions

- Separation of Concerns: We follow Clean Architecture principles.
- Domain-first logic: All business logic lives in /domain, not in routes.
- Extensibility: Easily support multiple chains or job queues.
- Security: Auth (via wallet cookie or JWT) is handled in middleware.

⸻

## ✨ Future Improvements

- Signature-based auth with nonce challenge
- Background queue for transaction execution
- Rate limiting & logging middleware
- CI/CD & containerization (Docker)
