import { citizenDetailsMock } from '@/mocks/citizenDetails'
import type {
  CitizenDetails,
  CitizenGeneralInfo,
  ContactInfo,
  DocumentRecord,
  EducationRecord,
  FamilyMember,
} from '@/types/citizen'
import { delay } from './delay'

const SIMULATED_LATENCY_MS = 300

export async function getCitizenGeneralInfo(
  id: number,
): Promise<CitizenGeneralInfo | undefined> {
  await delay(SIMULATED_LATENCY_MS)
  const citizen = citizenDetailsMock.find((item) => item.id === id)
  if (!citizen) return undefined

  const { familyMembers, education, contacts, documents, ...generalInfo } =
    citizen
  return generalInfo
}

export async function getCitizenFamilyMembers(
  id: number,
): Promise<FamilyMember[]> {
  await delay(SIMULATED_LATENCY_MS)
  return (
    citizenDetailsMock.find((citizen) => citizen.id === id)?.familyMembers ?? []
  )
}

export async function getCitizenEducation(
  id: number,
): Promise<EducationRecord[]> {
  await delay(SIMULATED_LATENCY_MS)
  return (
    citizenDetailsMock.find((citizen) => citizen.id === id)?.education ?? []
  )
}

export async function getCitizenContacts(
  id: number,
): Promise<ContactInfo | undefined> {
  await delay(SIMULATED_LATENCY_MS)
  return citizenDetailsMock.find((citizen) => citizen.id === id)?.contacts
}

export async function getCitizenDocuments(
  id: number,
): Promise<DocumentRecord[]> {
  await delay(SIMULATED_LATENCY_MS)
  return (
    citizenDetailsMock.find((citizen) => citizen.id === id)?.documents ?? []
  )
}

export async function updateCitizenDetails(
  id: number,
  patch: Partial<Omit<CitizenDetails, 'id'>>,
): Promise<CitizenDetails> {
  await delay(SIMULATED_LATENCY_MS)
  const index = citizenDetailsMock.findIndex((citizen) => citizen.id === id)
  if (index === -1) {
    throw new Error(`Citizen ${id} not found`)
  }

  const updated: CitizenDetails = {
    ...citizenDetailsMock[index],
    ...patch,
    id,
  }
  citizenDetailsMock[index] = updated
  return updated
}
