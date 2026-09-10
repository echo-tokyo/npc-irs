import { citizenDetailsMock } from '@/mocks/citizenDetails'
import { citizensMock } from '@/mocks/citizens'
import type { Citizen, CitizenDetails, StatusFilter } from '@/types/citizen'

export interface CitizensFilter {
  search?: string
  status?: StatusFilter
  district?: string
}

const SIMULATED_LATENCY_MS = 300

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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
  filter: CitizensFilter = {},
): Promise<Citizen[]> {
  await delay(SIMULATED_LATENCY_MS)
  return citizensMock.filter((citizen) => matchesFilter(citizen, filter))
}

export async function getCitizenDetails(
  id: number,
): Promise<CitizenDetails | undefined> {
  await delay(SIMULATED_LATENCY_MS)
  return citizenDetailsMock.find((citizen) => citizen.id === id)
}

export async function updateCitizenDetails(
  details: CitizenDetails,
): Promise<CitizenDetails> {
  await delay(SIMULATED_LATENCY_MS)
  const index = citizenDetailsMock.findIndex(
    (citizen) => citizen.id === details.id,
  )
  if (index !== -1) {
    citizenDetailsMock[index] = details
  }
  return details
}

export async function getDistricts(): Promise<string[]> {
  await delay(SIMULATED_LATENCY_MS)
  return Array.from(
    new Set(citizensMock.map((citizen) => citizen.district)),
  ).sort()
}
