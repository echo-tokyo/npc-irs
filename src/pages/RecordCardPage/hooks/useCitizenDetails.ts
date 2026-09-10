import { useQuery } from '@tanstack/react-query'
import { getCitizenDetails } from '@/services/citizensService'
import type { CitizenDetails } from '@/types/citizen'

interface UseCitizenDetailsResult {
  details: CitizenDetails | undefined
  isLoading: boolean
}

export function useCitizenDetails(id: number): UseCitizenDetailsResult {
  const query = useQuery({
    queryKey: ['citizenDetails', id],
    queryFn: () => getCitizenDetails(id),
  })

  return { details: query.data, isLoading: query.isPending }
}
