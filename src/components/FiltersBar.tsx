import type { Dispatch, SetStateAction } from 'react'
import { days } from '../constants/days'
import type { BodyType, FlightStatus } from '../types/flight'

type FiltersBarProps = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  dateFrom: string
  setDateFrom: Dispatch<SetStateAction<string>>
  dateTo: string
  setDateTo: Dispatch<SetStateAction<string>>
  statusFilter: 'All' | FlightStatus
  setStatusFilter: Dispatch<SetStateAction<'All' | FlightStatus>>
  aocFilter: string
  setAocFilter: Dispatch<SetStateAction<string>>
  bodyTypeFilter: 'All' | BodyType
  setBodyTypeFilter: Dispatch<SetStateAction<'All' | BodyType>>
  dayFilter: number[]
  setDayFilter: Dispatch<SetStateAction<number[]>>
  clearFilters: () => void
  aocOptions: string[]
}

export function FiltersBar({
  search,
  setSearch,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  statusFilter,
  setStatusFilter,
  aocFilter,
  setAocFilter,
  bodyTypeFilter,
  setBodyTypeFilter,
  dayFilter,
  setDayFilter,
  clearFilters,
  aocOptions,
}: FiltersBarProps) {
  return (
    <>
      <section className="filters">
        <input
          className="field"
          placeholder="Search flight no, origin, destination"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <input
          className="field"
          type="date"
          value={dateFrom}
          onChange={(event) => setDateFrom(event.target.value)}
        />
        <input
          className="field"
          type="date"
          value={dateTo}
          onChange={(event) => setDateTo(event.target.value)}
        />
        <select
          className="field"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as 'All' | FlightStatus)}
        >
          <option value="All">Status: All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select className="field" value={aocFilter} onChange={(event) => setAocFilter(event.target.value)}>
          {aocOptions.map((aoc) => (
            <option key={aoc} value={aoc}>
              {aoc === 'All' ? 'AOC: All' : aoc}
            </option>
          ))}
        </select>
        <select
          className="field"
          value={bodyTypeFilter}
          onChange={(event) => setBodyTypeFilter(event.target.value as 'All' | BodyType)}
        >
          <option value="All">Body type: All</option>
          <option value="narrow_body">narrow_body</option>
          <option value="wide_body">wide_body</option>
        </select>
        <button className="btn secondary" type="button" onClick={clearFilters}>
          Clear All
        </button>
      </section>

      <section className="days">
        {days.map((day) => (
          <button
            key={day.value}
            className={`chip ${dayFilter.includes(day.value) ? 'active' : ''}`}
            type="button"
            onClick={() =>
              setDayFilter((previous) =>
                previous.includes(day.value)
                  ? previous.filter((value) => value !== day.value)
                  : [...previous, day.value],
              )
            }
          >
            {day.label}
          </button>
        ))}
      </section>
    </>
  )
}
