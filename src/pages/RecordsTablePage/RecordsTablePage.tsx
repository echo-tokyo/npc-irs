import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid, type GridRowParams } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { useCitizens } from '@/hooks/useCitizens'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useDistricts } from '@/hooks/useDistricts'
import type { Citizen, StatusFilter } from '@/services/citizensService'
import { recordsColumns } from './columns'
import RecordsFilters from './RecordsFilters'

function RecordsTablePage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [district, setDistrict] = useState('all')

  const debouncedSearch = useDebouncedValue(search)
  const districts = useDistricts()
  const { citizens, isLoading } = useCitizens({
    search: debouncedSearch,
    status,
    district,
  })

  function handleRowClick(params: GridRowParams<Citizen>) {
    navigate(`/citizens/${params.id}`)
  }

  return (
    <Stack spacing={2.5} sx={{ height: '100%' }}>
      <Typography variant='h5'>Картотека</Typography>

      <Paper
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2.5,
        }}
      >
        <RecordsFilters
          search={search}
          status={status}
          district={district}
          districts={districts}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onDistrictChange={setDistrict}
        />

        <Typography variant='body2' color='text.secondary'>
          Всего найдено: {citizens.length}
        </Typography>

        <Box sx={{ flex: 1, minHeight: 0 }}>
          <DataGrid
            rows={citizens}
            columns={recordsColumns}
            loading={isLoading}
            density='compact'
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            initialState={{
              pagination: { paginationModel: { pageSize: 50, page: 0 } },
            }}
            pageSizeOptions={[25, 50, 100]}
            sx={{ height: '100%', border: 'none', cursor: 'pointer' }}
          />
        </Box>
      </Paper>
    </Stack>
  )
}

export default RecordsTablePage
