# Flight Schedule Management Table

Senior React Developer take-home implementation using React + TypeScript + Vite.

## Features

- Virtualized table rendering with `react-window`
- Inline row edit with `Save` and `Cancel`
- Simulated async save with loading state and failure handling
- Inline status toggle between `Active` and `Inactive`
- Single row delete
- Multi-select and bulk delete
- Combined filters using AND logic:
  - Date range overlap
  - Days of operation
  - Status
  - AOC
  - Body type
- Search by flight number, origin, or destination
- `Clear All` reset for active filters

## How I Approached This

- Started by mapping each assessment requirement to a specific UI behavior and state transition.
- Implemented data loading once at startup and kept all operations in local client state.
- Built a virtualized table first to ensure smooth rendering with 200 records before adding row actions.
- Added inline editing with optimistic local updates, simulated async save delay, loading state, and failure recovery.
- Implemented filter and search composition with AND logic so all controls work together consistently.
- Refactored the initial single-component version into modular components and a custom hook for clarity and maintainability.

## Project Structure

- `src/App.tsx`: page container
- `src/hooks/useFlights.ts`: data and interaction state
- `src/components/FiltersBar.tsx`: search + filters UI
- `src/components/FlightsTable.tsx`: table shell + virtualization
- `src/components/FlightRow.tsx`: row rendering and actions
- `src/types/flight.ts`: shared domain types
- `public/flights.json`: dataset

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Type check:

```bash
npx tsc -b
```

## Notes

- All operations are client-side only.
- Save operation is intentionally simulated with delay and random failure.
- The app loads `flights.json` once from the `public` folder and manages updates in local state.
