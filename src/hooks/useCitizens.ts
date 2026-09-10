import { useEffect, useState } from 'react'
import {
  getCitizens,
  type Citizen,
  type CitizensFilter,
} from '@/services/citizensService'

interface UseCitizensResult {
  citizens: Citizen[]
  isLoading: boolean
}

interface CitizensState {
  filter: CitizensFilter
  citizens: Citizen[]
}

const INITIAL_CITIZENS: Citizen[] = []

export function useCitizens(filter: CitizensFilter): UseCitizensResult {
  const { search, status, district } = filter
  const [state, setState] = useState<CitizensState>({
    filter: { search, status, district },
    citizens: INITIAL_CITIZENS,
  })

  useEffect(() => {
    let isCancelled = false

    getCitizens({ search, status, district }).then((citizens) => {
      if (!isCancelled) {
        setState({ filter: { search, status, district }, citizens })
      }
    })

    return () => {
      isCancelled = true
    }
  }, [search, status, district])

  const isFilterStale =
    state.filter.search !== search ||
    state.filter.status !== status ||
    state.filter.district !== district

  const isLoading = isFilterStale || state.citizens === INITIAL_CITIZENS

  return { citizens: state.citizens, isLoading }
}
