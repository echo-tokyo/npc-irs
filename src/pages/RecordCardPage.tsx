import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'

function RecordCardPage() {
  const { id } = useParams()

  return (
    <Typography variant='h5'>Карточка записи №{id} (в разработке)</Typography>
  )
}

export default RecordCardPage
