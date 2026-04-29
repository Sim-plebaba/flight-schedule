import type { Dispatch, SetStateAction } from 'react'
import type { EditState, Flight, FlightStatus } from '../types/flight'

export type FlightRowDataProps = {
  rows: Flight[]
  selectedIds: Set<string>
  editingId: string | null
  editState: EditState | null
  savingId: string | null
  errorId: string | null
  toggleSelectOne: (id: string) => void
  setEditState: Dispatch<SetStateAction<EditState | null>>
  toggleStatus: (id: string) => void
  saveEdit: (id: string) => Promise<void>
  cancelEdit: () => void
  startEdit: (flight: Flight) => void
  deleteOne: (id: string) => void
}

export function FlightRow({
  index,
  style,
  rows,
  selectedIds,
  editingId,
  editState,
  savingId,
  errorId,
  toggleSelectOne,
  setEditState,
  toggleStatus,
  saveEdit,
  cancelEdit,
  startEdit,
  deleteOne,
}: any) {
  const flight = rows[index]
  if (!flight) return null
  const isEditing = editingId === flight.id && editState
  const isSaving = savingId === flight.id
  const hasError = errorId === flight.id

  return (
    <div style={style} className={`row ${hasError ? 'error' : ''}`}>
      <span>
        <input type="checkbox" checked={selectedIds.has(flight.id)} onChange={() => toggleSelectOne(flight.id)} />
      </span>
      <span>{flight.id}</span>
      <span>{flight.aoc}</span>
      <span>{flight.flightNumber}</span>
      <span>
        {flight.origin} - {flight.destination}
      </span>
      <span>
        {isEditing ? (
          <div className="inline-pair">
            <input
              type="time"
              value={editState.std}
              onChange={(event) =>
                setEditState((previous: EditState | null) =>
                  previous ? { ...previous, std: event.target.value } : previous,
                )
              }
            />
            <input
              type="time"
              value={editState.sta}
              onChange={(event) =>
                setEditState((previous: EditState | null) =>
                  previous ? { ...previous, sta: event.target.value } : previous,
                )
              }
            />
          </div>
        ) : (
          `${flight.std} / ${flight.sta}`
        )}
      </span>
      <span>{flight.daysOfOperation.join(',')}</span>
      <span>{flight.bodyType}</span>
      <span>
        {isEditing ? (
          <div className="inline-pair">
            <input
              type="date"
              value={editState.startDate}
              onChange={(event) =>
                setEditState((previous: EditState | null) =>
                  previous ? { ...previous, startDate: event.target.value } : previous,
                )
              }
            />
            <input
              type="date"
              value={editState.endDate}
              onChange={(event) =>
                setEditState((previous: EditState | null) =>
                  previous ? { ...previous, endDate: event.target.value } : previous,
                )
              }
            />
          </div>
        ) : (
          `${flight.startDate} / ${flight.endDate}`
        )}
      </span>
      <span>
        {isEditing ? (
          <select
            value={editState.status}
            onChange={(event) =>
              setEditState((previous: EditState | null) =>
                previous ? { ...previous, status: event.target.value as FlightStatus } : previous,
              )
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        ) : (
          <button className={`status ${flight.status}`} type="button" onClick={() => toggleStatus(flight.id)}>
            {flight.status}
          </button>
        )}
      </span>
      <span className="actions-inline">
        {isEditing ? (
          <>
            <button className="btn" type="button" onClick={() => void saveEdit(flight.id)} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button className="btn secondary" type="button" onClick={cancelEdit} disabled={isSaving}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn secondary"
              type="button"
              onClick={() => startEdit(flight)}
              disabled={savingId !== null}
            >
              Edit
            </button>
            <button className="btn danger" type="button" onClick={() => deleteOne(flight.id)}>
              Delete
            </button>
          </>
        )}
      </span>
    </div>
  )
}
