import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { useCitizenGeneralInfo } from './hooks/useCitizenGeneralInfo'
import RecordCardView from './RecordCardView'

function RecordCardPage() {
  const { id } = useParams<{ id: string }>()
  const citizenId = Number(id)
  const { generalInfo, isLoading } = useCitizenGeneralInfo(citizenId)

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!generalInfo) {
    return <Typography variant='h6'>Запись не найдена</Typography>
  }

  return (
    <RecordCardView
      key={generalInfo.id}
      citizenId={citizenId}
      initialGeneralInfo={generalInfo}
    />
  )
}

export default RecordCardPage
