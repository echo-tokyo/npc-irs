import { citizensMock } from '@/mocks/citizens'
import type { Citizen, StatusFilter } from '@/types/citizen'
import { delay } from './delay'

export interface CitizensFilter {
  search?: string
  status?: StatusFilter
  district?: string
}

export interface CitizensPage {
  rows: Citizen[]
  rowCount: number
}

const SIMULATED_LATENCY_MS = 300

function matchesFilter(citizen: Citizen, filter: CitizensFilter): boolean {
  if (
    filter.status &&
    filter.status !== 'all' &&
    citizen.status !== filter.status
  ) {
    return false
  }

  if (
    filter.district &&
    filter.district !== 'all' &&
    citizen.district !== filter.district
  ) {
    return false
  }

  const query = filter.search?.trim().toLowerCase()
  if (query) {
    const fullName =
      `${citizen.lastName} ${citizen.firstName} ${citizen.middleName}`.toLowerCase()
    if (
      !fullName.includes(query) &&
      !citizen.caseNumber.toLowerCase().includes(query)
    ) {
      return false
    }
  }

  return true
}

export async function getCitizens(
  filter: CitizensFilter,
  page: number,
  pageSize: number,
): Promise<CitizensPage> {
  await delay(SIMULATED_LATENCY_MS)
  const matched = citizensMock.filter((citizen) =>
    matchesFilter(citizen, filter),
  )
  const start = page * pageSize
  return {
    rows: matched.slice(start, start + pageSize),
    rowCount: matched.length,
  }
}

export async function getDistricts(): Promise<string[]> {
  await delay(SIMULATED_LATENCY_MS)
  return Array.from(
    new Set(citizensMock.map((citizen) => citizen.district)),
  ).sort()
}
