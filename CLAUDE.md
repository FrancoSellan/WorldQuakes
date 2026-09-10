# Project Context: Global Disaster Tracker

## 1. Overview & Vision
A web platform to monitor and visualize natural disasters and geological/meteorological events globally in real time and historically.
The app displays events on an interactive map, backed by official scientific data feeds (USGS, NASA, etc.).

## 2. Technical Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Mapping (Target):** Mapbox GL JS / MapLibre GL JS / Leaflet
- **Data Providers:**
  - USGS Earthquake Hazards Program (Earthquakes)
  - NASA EONET / NASA FIRMS (Wildfires, Volcanoes, Severe Storms)
  - GDACS / ReliefWeb (Planned)

## 3. Architecture & Key Principles
This is a **monorepo / unified Next.js application** hosting both frontend and backend functionality.

### Core Rules:
1. **Server-First API Normalization:**
   - External third-party APIs are **never** queried directly from client components.
   - All external requests happen via Next.js Route Handlers (`app/api/.../route.ts`) or Server Components to avoid CORS issues, protect keys, cache responses, and normalize data.
2. **Domain-Driven Service Layer (`lib/services/`):**
   - Keep business logic and API extractors out of the `app/` folder.
   - Organize services by natural phenomenon domain:
     ```text
     src/lib/services/
     ├── earthquakes/
     │   └── usgs.service.ts
     ├── wildfires/
     │   └── nasa-wildfires.service.ts
     ├── volcanoes/
     │   └── volcanoes.service.ts
     └── severe-storms/
         └── storms.service.ts
     ```
3. **Unified Data Contract:**
   - All services must map raw third-party payloads into a standard interface (`UnifiedDisaster`) defined in `types/disaster.ts`.
   - Coordinates must always be normalized to `{ lat: number, lng: number }` (watch out for GeoJSON `[lng, lat]` vs Leaflet/Mapbox conventions).

## 4. Project Structure
```text
├── src/ (or root)
│   ├── app/
│   │   ├── api/
│   │   │   └── disasters/
│   │   │       └── route.ts          # Public JSON API endpoint
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Main interactive map view
│   ├── components/
│   │   ├── map/                      # Map canvas, markers, popups
│   │   └── ui/                       # Filters, timelines, panels
│   ├── lib/
│   │   └── services/                 # Domain-driven API clients
│   └── types/
│       └── disaster.ts               # Shared TypeScript schemas
├── CLAUDE.md                         # Context file for Claude CLI
└── package.json