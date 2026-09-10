import { citizensMock } from '@/mocks/citizens'

export type Gender = 'male' | 'female'

export type CitizenStatus = 'active' | 'archived' | 'pending'

export type StatusFilter = CitizenStatus | 'all'

export interface Citizen {
  id: number
  caseNumber: string
  lastName: string
  firstName: string
  middleName: string
  birthDate: string
  gender: Gender
  status: CitizenStatus
  district: string
  address: string
  phone: string
  registrationDate: string
}

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

export async function getCitizenById(id: number): Promise<Citizen | undefined> {
  await delay(SIMULATED_LATENCY_MS)
  return citizensMock.find((citizen) => citizen.id === id)
}

export async function getDistricts(): Promise<string[]> {
  await delay(SIMULATED_LATENCY_MS)
  return Array.from(
    new Set(citizensMock.map((citizen) => citizen.district)),
  ).sort()
}
