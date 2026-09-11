import { useQuery, type UseQueryResult } from '@tanstack/react-query'

export function useCitizenSection<T>(
  key: string,
  id: number,
  enabled: boolean,
  fetcher: (id: number) => Promise<T>,
): UseQueryResult<T> {
  return useQuery({
    queryKey: [key, id],
    queryFn: () => fetcher(id),
    enabled,
  })
}
