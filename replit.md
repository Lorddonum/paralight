# Paralight - Architectural Lighting Product Catalog

## Overview

Paralight is a product catalog and company website for an architectural lighting solutions business. The application showcases aluminum profiles and magnetic track lighting systems, with an admin panel for product management. It's built as a full-stack TypeScript application with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Fonts**: Space Grotesk (display/headers) and Inter (body text)

### Backend Architecture
- **Framework**: Express 5 with TypeScript
- **Build Tool**: esbuild for server bundling, Vite for client
- **API Pattern**: RESTful endpoints under `/api/*` prefix
- **Storage Layer**: Database storage class implementing IStorage interface for abstraction

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` - shared between frontend and backend
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Tables**: 
  - `users` - authentication (id, username, password)
  - `products` - product catalog with lighting specifications (name, model number, series, brand, category, technical specs like wattage, voltage, CRI, CCT, beam angle)

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/  # UI components (layout, home sections, shadcn/ui)
│   │   ├── pages/       # Route pages (Home, Products, Admin, About, Contact)
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Drizzle database connection
├── shared/           # Shared types and schemas
│   └── schema.ts     # Drizzle schema definitions
└── migrations/       # Database migrations (drizzle-kit)
```

### Development vs Production
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Static files served from `dist/public`, server bundled to `dist/index.cjs`
- **Build Script**: Custom build script in `script/build.ts` handles both client and server builds

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **pg**: Node.js PostgreSQL client
- **connect-pg-simple**: Session storage (available but session auth not fully implemented)

### Third-Party Services
- No external API integrations currently configured
- OpenAI and Stripe dependencies exist in package.json but are not actively used in the codebase

### Key NPM Packages
- **drizzle-orm / drizzle-kit**: Database ORM and migration tooling
- **@tanstack/react-query**: Async state management
- **framer-motion**: Animation library
- **wouter**: Client-side routing
- **zod**: Runtime type validation
- **lucide-react**: Icon library