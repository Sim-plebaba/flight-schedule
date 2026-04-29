import { useEffect, useMemo, useState } from 'react'
import type { BodyType, EditState, Flight, FlightsResponse, FlightStatus } from '../types/flight'

function overlap(startA: string, endA: string, startB: string, endB: string) {
  return startA <= endB && startB <= endA
}

export function useFlights() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [dayFilter, setDayFilter] = useState<number[]>([])
  const [statusFilter, setStatusFilter] = useState<'All' | FlightStatus>('All')
  const [aocFilter, setAocFilter] = useState('All')
  const [bodyTypeFilter, setBodyTypeFilter] = useState<'All' | BodyType>('All')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editState, setEditState] = useState<EditState | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [errorId, setErrorId] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/flights.json')
      const data = (await response.json()) as FlightsResponse
      setFlights(data.flights)
    }
    void load()
  }, [])

  const aocOptions = useMemo(() => {
    const set = new Set(flights.map((flight) => flight.aoc))
    return ['All', ...Array.from(set).sort()]
  }, [flights])

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const query = search.trim().toLowerCase()
      const searchOk =
        query.length === 0 ||
        flight.flightNumber.toLowerCase().includes(query) ||
        flight.origin.toLowerCase().includes(query) ||
        flight.destination.toLowerCase().includes(query)

      const statusOk = statusFilter === 'All' || flight.status === statusFilter
      const aocOk = aocFilter === 'All' || flight.aoc === aocFilter
      const bodyTypeOk = bodyTypeFilter === 'All' || flight.bodyType === bodyTypeFilter
      const dayOk =
        dayFilter.length === 0 ||
        dayFilter.some((selectedDay) => flight.daysOfOperation.includes(selectedDay))

      const dateOk =
        (!dateFrom && !dateTo) ||
        (dateFrom && !dateTo ? overlap(flight.startDate, flight.endDate, dateFrom, dateFrom) : true) ||
        (!dateFrom && dateTo ? overlap(flight.startDate, flight.endDate, dateTo, dateTo) : true) ||
        (dateFrom && dateTo ? overlap(flight.startDate, flight.endDate, dateFrom, dateTo) : true)

      return searchOk && statusOk && aocOk && bodyTypeOk && dayOk && dateOk
    })
  }, [flights, search, statusFilter, aocFilter, bodyTypeFilter, dayFilter, dateFrom, dateTo])

  const allVisibleSelected =
    filteredFlights.length > 0 && filteredFlights.every((flight) => selectedIds.has(flight.id))

  const toggleSelectAllVisible = () => {
    setSelectedIds((previous) => {
      const next = new Set(previous)
      if (allVisibleSelected) {
        filteredFlights.forEach((flight) => next.delete(flight.id))
      } else {
        filteredFlights.forEach((flight) => next.add(flight.id))
      }
      return next
    })
  }

  const toggleSelectOne = (id: string) => {
    setSelectedIds((previous) => {
      const next = new Set(previous)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const clearFilters = () => {
    setSearch('')
    setDateFrom('')
    setDateTo('')
    setDayFilter([])
    setStatusFilter('All')
    setAocFilter('All')
    setBodyTypeFilter('All')
  }

  const deleteOne = (id: string) => {
    setFlights((previous) => previous.filter((flight) => flight.id !== id))
    setSelectedIds((previous) => {
      const next = new Set(previous)
      next.delete(id)
      return next
    })
    if (editingId === id) {
      setEditingId(null)
      setEditState(null)
    }
  }

  const deleteSelected = () => {
    if (selectedIds.size === 0) return
    setFlights((previous) => previous.filter((flight) => !selectedIds.has(flight.id)))
    setSelectedIds(new Set())
    if (editingId && selectedIds.has(editingId)) {
      setEditingId(null)
      setEditState(null)
    }
  }

  const toggleStatus = (id: string) => {
    setFlights((previous) =>
      previous.map((flight) =>
        flight.id === id
          ? { ...flight, status: flight.status === 'Active' ? 'Inactive' : 'Active' }
          : flight,
      ),
    )
  }

  const startEdit = (flight: Flight) => {
    setErrorId(null)
    setEditingId(flight.id)
    setEditState({
      startDate: flight.startDate,
      endDate: flight.endDate,
      std: flight.std,
      sta: flight.sta,
      status: flight.status,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditState(null)
  }

  const saveEdit = async (id: string) => {
    if (!editState) return
    setSavingId(id)
    setErrorId(null)
    const previous = flights.find((flight) => flight.id === id)
    await new Promise((resolve) => setTimeout(resolve, 900))
    const fail = Math.random() < 0.2
    if (fail) {
      setSavingId(null)
      setErrorId(id)
      if (previous) {
        setFlights((current) =>
          current.map((flight) => (flight.id === id ? { ...flight, ...previous } : flight)),
        )
      }
      return
    }
    setFlights((current) =>
      current.map((flight) => (flight.id === id ? { ...flight, ...editState } : flight)),
    )
    setSavingId(null)
    setEditingId(null)
    setEditState(null)
  }

  return {
    selectedIds,
    filteredFlights,
    search,
    setSearch,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    dayFilter,
    setDayFilter,
    statusFilter,
    setStatusFilter,
    aocFilter,
    setAocFilter,
    bodyTypeFilter,
    setBodyTypeFilter,
    clearFilters,
    aocOptions,
    allVisibleSelected,
    toggleSelectAllVisible,
    deleteSelected,
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
  }
}
