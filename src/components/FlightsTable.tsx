import type { Dispatch, SetStateAction } from 'react'
import { List } from 'react-window'
import { FlightRow } from './FlightRow'
import type { EditState, Flight } from '../types/flight'
import type { FlightRowDataProps } from './FlightRow'

type FlightsTableProps = {
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

export function FlightsTable({
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
}: FlightsTableProps) {
  return (
    <div className="table-wrap">
      <div className="thead">
        <span />
        <span>ID</span>
        <span>AOC</span>
        <span>Flight</span>
        <span>Route</span>
        <span>STD/STA</span>
        <span>Days</span>
        <span>Body</span>
        <span>Start/End</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      <List
        rowComponent={FlightRow}
        rowCount={rows.length}
        rowHeight={58}
        rowProps={{
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
        } as FlightRowDataProps}
        style={{ height: 540 }}
      />
    </div>
  )
}
