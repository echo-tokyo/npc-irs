import { useQuery } from '@tanstack/react-query'
import { getDistricts } from '@/services/citizensService'

interface UseDistrictsResult {
  districts: string[]
  isLoading: boolean
}

export function useDistricts(): UseDistrictsResult {
  const query = useQuery({
    queryKey: ['districts'],
    queryFn: getDistricts,
  })

  return { districts: query.data ?? [], isLoading: query.isLoading }
}
