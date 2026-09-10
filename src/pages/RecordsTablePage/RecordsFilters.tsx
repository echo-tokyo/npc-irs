import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import type { ChangeEvent } from 'react'
import type { StatusFilter } from '@/services/citizensService'
import { STATUS_LABELS } from '@/utils/citizenLabels'

const STATUS_OPTIONS: Array<{ value: StatusFilter; label: string }> = [
  { value: 'all', label: 'Все статусы' },
  { value: 'active', label: STATUS_LABELS.active },
  { value: 'archived', label: STATUS_LABELS.archived },
  { value: 'pending', label: STATUS_LABELS.pending },
]

interface RecordsFiltersProps {
  search: string
  status: StatusFilter
  district: string
  districts: string[]
  onSearchChange: (value: string) => void
  onStatusChange: (value: StatusFilter) => void
  onDistrictChange: (value: string) => void
}

function RecordsFilters({
  search,
  status,
  district,
  districts,
  onSearchChange,
  onStatusChange,
  onDistrictChange,
}: RecordsFiltersProps) {
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value)
  }

  function handleStatusChange(event: ChangeEvent<HTMLInputElement>) {
    onStatusChange(event.target.value as StatusFilter)
  }

  function handleDistrictChange(event: ChangeEvent<HTMLInputElement>) {
    onDistrictChange(event.target.value)
  }

  return (
    <Stack direction='row' spacing={2} sx={{ flexWrap: 'wrap' }}>
      <TextField
        label='Поиск по ФИО или № дела'
        value={search}
        onChange={handleSearchChange}
        size='small'
        sx={{ minWidth: 260 }}
      />
      <TextField
        select
        label='Статус'
        value={status}
        onChange={handleStatusChange}
        size='small'
        sx={{ minWidth: 200 }}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label='Район'
        value={district}
        onChange={handleDistrictChange}
        size='small'
        sx={{ minWidth: 200 }}
      >
        <MenuItem value='all'>Все районы</MenuItem>
        {districts.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  )
}

export default RecordsFilters
