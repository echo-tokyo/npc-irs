import { useSearchParams } from 'react-router-dom'
import type { GridPaginationModel } from '@mui/x-data-grid'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import type { StatusFilter } from '@/types/citizen'

const DEFAULT_PAGE_SIZE = 50
const SEARCH_DEBOUNCE_MS = 300

interface RecordsTableFilters {
  search: string
  status: StatusFilter
  district: string
  paginationModel: GridPaginationModel
  setSearch: (value: string) => void
  setStatus: (value: StatusFilter) => void
  setDistrict: (value: string) => void
  setPaginationModel: (model: GridPaginationModel) => void
}

function setOrDelete(params: URLSearchParams, key: string, value: string) {
  if (value) {
    params.set(key, value)
  } else {
    params.delete(key)
  }
}

export function useRecordsTableFilters(): RecordsTableFilters {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') ?? ''
  const status = (searchParams.get('status') as StatusFilter | null) ?? 'all'
  const district = searchParams.get('district') ?? 'all'
  const paginationModel: GridPaginationModel = {
    page: Number(searchParams.get('page') ?? 0),
    pageSize: Number(searchParams.get('pageSize') ?? DEFAULT_PAGE_SIZE),
  }

  function updateFilter(key: string, value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        setOrDelete(next, key, value)
        next.delete('page')
        return next
      },
      { replace: true },
    )
  }

  const setSearch = useDebouncedCallback(
    (value: string) => updateFilter('q', value),
    SEARCH_DEBOUNCE_MS,
  )

  function setPaginationModel(model: GridPaginationModel) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        setOrDelete(next, 'page', model.page ? String(model.page) : '')
        setOrDelete(
          next,
          'pageSize',
          model.pageSize === DEFAULT_PAGE_SIZE ? '' : String(model.pageSize),
        )
        return next
      },
      { replace: true },
    )
  }

  return {
    search,
    status,
    district,
    paginationModel,
    setSearch,
    setStatus: (value) => updateFilter('status', value === 'all' ? '' : value),
    setDistrict: (value) =>
      updateFilter('district', value === 'all' ? '' : value),
    setPaginationModel,
  }
}
