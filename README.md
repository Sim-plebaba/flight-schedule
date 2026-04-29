# Flight Schedule Management Table

## Overview

This project is a flight schedule management table built with performance and usability in mind. It handles a fairly large dataset (200+ records) while keeping interactions smooth and responsive.

The table supports editing, filtering, searching, and bulk actions — all handled on the client side.

---

## Features

- Virtualized table using `react-window` for better performance
- Inline row editing with Save and Cancel options
- Simulated async save (includes loading state and random failure)
- Toggle flight status between Active and Inactive
- Delete individual rows
- Multi-select with bulk delete
- Combined filtering (AND logic):
  - Date range overlap
  - Days of operation
  - Status
  - AOC
  - Body type
- Search by flight number, origin, or destination
- "Clear All" option to reset filters

---

## Approach

I started by breaking down the requirements into smaller UI behaviors and state changes.

First, I focused on getting the table rendering efficiently using virtualization. Once that was working well, I added row-level actions like editing, deleting, and status toggling.

For editing, I implemented a simple inline approach and simulated an async save to mimic real API behavior — including occasional failures to handle error scenarios.

Filtering and search were built to work together using AND logic so multiple conditions can be applied at once without conflicts.

Finally, I refactored everything into smaller components and moved the logic into a custom hook to keep the code clean and maintainable.

---

## Project Structure

src/
  App.tsx                  // Main page container
  hooks/useFlights.ts      // Core state and logic
  components/
    FiltersBar.tsx         // Search and filter UI
    FlightsTable.tsx       // Table wrapper + virtualization
    FlightRow.tsx          // Row rendering and actions
  types/flight.ts          // Shared types

public/
  flights.json             // Static dataset

---

## Setup

### Prerequisites

- Node.js v22 or higher
- npm (comes with Node.js)

### Install dependencies

npm install

### Run development server

npm run dev

### Type check

npx tsc -b

---

## Notes

- All operations are client-side only.
- Save is simulated with delay and random failure.
- Data is loaded once from `flights.json` and managed in local state.
