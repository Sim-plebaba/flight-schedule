import { FiltersBar } from './components/FiltersBar'
import { FlightsTable } from './components/FlightsTable'
import { useFlights } from './hooks/useFlights'

function App() {
  const flights = useFlights()

  return (
    <main className="app">
      <header className="top">
        <h1>Flight Schedule Management</h1>
        <p>{flights.filteredFlights.length} flights visible</p>
      </header>

      <FiltersBar
        search={flights.search}
        setSearch={flights.setSearch}
        dateFrom={flights.dateFrom}
        setDateFrom={flights.setDateFrom}
        dateTo={flights.dateTo}
        setDateTo={flights.setDateTo}
        statusFilter={flights.statusFilter}
        setStatusFilter={flights.setStatusFilter}
        aocFilter={flights.aocFilter}
        setAocFilter={flights.setAocFilter}
        bodyTypeFilter={flights.bodyTypeFilter}
        setBodyTypeFilter={flights.setBodyTypeFilter}
        dayFilter={flights.dayFilter}
        setDayFilter={flights.setDayFilter}
        clearFilters={flights.clearFilters}
        aocOptions={flights.aocOptions}
      />

      <section className="actions">
        <label className="select-all">
          <input type="checkbox" checked={flights.allVisibleSelected} onChange={flights.toggleSelectAllVisible} />
          Select all visible
        </label>
        <button
          className="btn danger"
          type="button"
          onClick={flights.deleteSelected}
          disabled={flights.selectedIds.size === 0}
        >
          Delete selected ({flights.selectedIds.size})
        </button>
      </section>

      <FlightsTable
        rows={flights.filteredFlights}
        selectedIds={flights.selectedIds}
        editingId={flights.editingId}
        editState={flights.editState}
        savingId={flights.savingId}
        errorId={flights.errorId}
        toggleSelectOne={flights.toggleSelectOne}
        setEditState={flights.setEditState}
        toggleStatus={flights.toggleStatus}
        saveEdit={flights.saveEdit}
        cancelEdit={flights.cancelEdit}
        startEdit={flights.startEdit}
        deleteOne={flights.deleteOne}
      />
    </main>
  )
}

export default App
