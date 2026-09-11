import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid, type GridRowParams } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { useDistricts } from '@/hooks/useDistricts'
import type { Citizen } from '@/types/citizen'
import RecordsFilters from './components/RecordsFilters'
import { recordsColumns } from './constants/columns'
import { useCitizens } from './hooks/useCitizens'
import { useRecordsTableFilters } from './hooks/useRecordsTableFilters'

function RecordsTablePage() {
  const navigate = useNavigate()
  const filters = useRecordsTableFilters()
  const { districts } = useDistricts()
  const { citizens, rowCount, isLoading } = useCitizens(
    {
      search: filters.search,
      status: filters.status,
      district: filters.district,
    },
    filters.paginationModel.page,
    filters.paginationModel.pageSize,
  )

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
          initialSearch={filters.search}
          status={filters.status}
          district={filters.district}
          districts={districts}
          onSearchChange={filters.setSearch}
          onStatusChange={filters.setStatus}
          onDistrictChange={filters.setDistrict}
        />

        <Typography variant='body2' color='text.secondary'>
          Всего найдено: {rowCount}
        </Typography>

        <Box sx={{ flex: 1, minHeight: 0 }}>
          <DataGrid
            rows={citizens}
            columns={recordsColumns}
            loading={isLoading}
            density='compact'
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            paginationMode='server'
            rowCount={rowCount}
            paginationModel={filters.paginationModel}
            onPaginationModelChange={filters.setPaginationModel}
            pageSizeOptions={[25, 50, 100]}
            sx={{ height: '100%', border: 'none', cursor: 'pointer' }}
          />
        </Box>
      </Paper>
    </Stack>
  )
}

export default RecordsTablePage
