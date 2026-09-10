import { useEffect, useState } from 'react'
import { getDistricts } from '@/services/citizensService'

export function useDistricts(): string[] {
  const [districts, setDistricts] = useState<string[]>([])

  useEffect(() => {
    getDistricts().then(setDistricts)
  }, [])

  return districts
}
