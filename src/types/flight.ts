export type FlightStatus = 'Active' | 'Inactive'
export type BodyType = 'narrow_body' | 'wide_body'

export type Flight = {
  id: string
  aoc: string
  flightNumber: string
  origin: string
  destination: string
  std: string
  sta: string
  daysOfOperation: number[]
  bodyType: BodyType
  startDate: string
  endDate: string
  status: FlightStatus
}

export type FlightsResponse = {
  flights: Flight[]
}

export type EditState = Pick<Flight, 'startDate' | 'endDate' | 'std' | 'sta' | 'status'>
