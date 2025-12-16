# Munchies

Restaurant discovery app with category filtering.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Architecture

### Caching Strategy

The app uses two-layer caching:

- **Server layer**: Route Handlers with `revalidate: 300` (5 min)
- **Client layer**: TanStack Query with `staleTime: 5 min`

Server caching reduces calls to the external API. Client caching reduces calls to our own Route Handlers.

## Key Decisions

- **Single full-stack framework** — Next.js handles both proxy (Route Handlers) and frontend, avoiding the complexity of having two separate apps (e.g. Node.js proxy server + separate frontend app connected with Docker Compose).
- **Using Next.js API Route as a proxy to the external API** — Handles CORS, enables server-side caching, hides external API details from the client
- **Client Components with useQuery** — Data fetching happens on the client with TanStack Query. This allows for really nice DX for loading and error states.


## Project Structure

```
app/api/        → Proxy routes (restaurants, filters)
components/     → UI components
types/          → TypeScript interfaces
```

## Trade-offs

- Sidebar delivery time and price range filters are visual-only (not connected to state)
- Food category filtering works on both filter bar and sidebar

## Future Improvements

- Add open/closed status from API
- Implement delivery time / price range filtering
- Add Suspense-based loading/error states with `useSuspenseQuery` and Error Boundaries
- Add tests (Jest) and mock external API with MSW
- Pixel-perfect design matching with Figma
- Normalize delivery times to ranges (e.g. "5-10 min", "20-45 min", "1 hour+")
