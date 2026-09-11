import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getCitizens, type CitizensFilter } from '@/services/citizensService'
import type { Citizen } from '@/types/citizen'

interface UseCitizensResult {
  citizens: Citizen[]
  rowCount: number
  isLoading: boolean
}

export function useCitizens(
  filter: CitizensFilter,
  page: number,
  pageSize: number,
): UseCitizensResult {
  const query = useQuery({
    queryKey: ['citizens', filter, page, pageSize],
    queryFn: () => getCitizens(filter, page, pageSize),
    placeholderData: keepPreviousData,
  })

  return {
    citizens: query.data?.rows ?? [],
    rowCount: query.data?.rowCount ?? 0,
    isLoading: query.isFetching,
  }
}
