import { useQuery } from '@tanstack/react-query'
import { getCitizenGeneralInfo } from '@/services/citizenDetailsService'
import type { CitizenGeneralInfo } from '@/types/citizen'

interface UseCitizenGeneralInfoResult {
  generalInfo: CitizenGeneralInfo | undefined
  isLoading: boolean
}

export function useCitizenGeneralInfo(id: number): UseCitizenGeneralInfoResult {
  const query = useQuery({
    queryKey: ['citizenGeneralInfo', id],
    queryFn: () => getCitizenGeneralInfo(id),
  })

  return { generalInfo: query.data, isLoading: query.isPending }
}
