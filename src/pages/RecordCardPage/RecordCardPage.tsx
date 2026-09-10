import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { useCitizenDetails } from './hooks/useCitizenDetails'
import RecordCardView from './RecordCardView'

function RecordCardPage() {
  const { id } = useParams<{ id: string }>()
  const { details, isLoading } = useCitizenDetails(Number(id))

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!details) {
    return <Typography variant='h6'>Запись не найдена</Typography>
  }

  return <RecordCardView key={details.id} initialDetails={details} />
}

export default RecordCardPage
