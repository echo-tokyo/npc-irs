import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getCitizens, type CitizensFilter } from '@/services/citizensService'
import type { Citizen } from '@/types/citizen'

interface UseCitizensResult {
  citizens: Citizen[]
  isLoading: boolean
}

export function useCitizens(filter: CitizensFilter): UseCitizensResult {
  const query = useQuery({
    queryKey: ['citizens', filter],
    queryFn: () => getCitizens(filter),
    placeholderData: keepPreviousData,
  })

  return { citizens: query.data ?? [], isLoading: query.isFetching }
}
