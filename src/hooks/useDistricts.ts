import { useQuery } from '@tanstack/react-query'
import { getDistricts } from '@/services/citizensService'

export function useDistricts(): string[] {
  const query = useQuery({
    queryKey: ['districts'],
    queryFn: getDistricts,
  })

  return query.data ?? []
}
