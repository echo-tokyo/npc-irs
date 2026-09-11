import { citizensMock } from '@/mocks/citizens'
import type { CitizenStatus } from '@/types/citizen'
import { delay } from './delay'

const SIMULATED_LATENCY_MS = 300

const AGE_GROUPS = [
  { label: 'До 18', min: 0, max: 17 },
  { label: '18–30', min: 18, max: 30 },
  { label: '31–45', min: 31, max: 45 },
  { label: '46–60', min: 46, max: 60 },
  { label: '60+', min: 61, max: Infinity },
] as const

export interface DashboardStats {
  total: number
  byStatus: { status: CitizenStatus; count: number }[]
  byDistrict: { district: string; count: number }[]
  byAgeGroup: { label: string; count: number }[]
  byRegistrationYear: { year: string; count: number }[]
}

function getAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  const hadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate())
  return (
    today.getFullYear() - birth.getFullYear() - (hadBirthdayThisYear ? 0 : 1)
  )
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await delay(SIMULATED_LATENCY_MS)

  const byStatus = new Map<CitizenStatus, number>()
  const byDistrict = new Map<string, number>()
  const byAgeGroup = new Map(AGE_GROUPS.map((group) => [group.label, 0]))
  const byYear = new Map<string, number>()

  for (const citizen of citizensMock) {
    byStatus.set(citizen.status, (byStatus.get(citizen.status) ?? 0) + 1)
    byDistrict.set(
      citizen.district,
      (byDistrict.get(citizen.district) ?? 0) + 1,
    )

    const age = getAge(citizen.birthDate)
    const group = AGE_GROUPS.find((g) => age >= g.min && age <= g.max)
    if (group)
      byAgeGroup.set(group.label, (byAgeGroup.get(group.label) ?? 0) + 1)

    const year = citizen.registrationDate.slice(0, 4)
    byYear.set(year, (byYear.get(year) ?? 0) + 1)
  }

  return {
    total: citizensMock.length,
    byStatus: Array.from(byStatus, ([status, count]) => ({ status, count })),
    byDistrict: Array.from(byDistrict, ([district, count]) => ({
      district,
      count,
    })).sort((a, b) => b.count - a.count),
    byAgeGroup: AGE_GROUPS.map((group) => ({
      label: group.label,
      count: byAgeGroup.get(group.label) ?? 0,
    })),
    byRegistrationYear: Array.from(byYear, ([year, count]) => ({
      year,
      count,
    })).sort((a, b) => a.year.localeCompare(b.year)),
  }
}
