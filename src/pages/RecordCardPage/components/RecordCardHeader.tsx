import { memo } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import type { CitizenStatus } from '@/types/citizen'
import { STATUS_CHIP_COLORS, STATUS_LABELS } from '@/utils/citizenLabels'

interface RecordCardHeaderProps {
  lastName: string
  firstName: string
  middleName: string
  caseNumber: string
  status: CitizenStatus
  isDirty: boolean
  isSaving: boolean
  onReset: () => void
  onSave: () => void
}

function RecordCardHeader({
  lastName,
  firstName,
  middleName,
  caseNumber,
  status,
  isDirty,
  isSaving,
  onReset,
  onSave,
}: RecordCardHeaderProps) {
  const navigate = useNavigate()

  return (
    <Stack direction='row' spacing={1.5} sx={{ alignItems: 'center' }}>
      <IconButton onClick={() => navigate(-1)} aria-label='Назад к картотеке'>
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ flex: 1 }}>
        <Typography variant='h5'>
          {lastName} {firstName} {middleName}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          № дела {caseNumber}
        </Typography>
      </Box>
      <Chip label={STATUS_LABELS[status]} color={STATUS_CHIP_COLORS[status]} />
      {isDirty && (
        <Button onClick={onReset} disabled={isSaving}>
          Сбросить
        </Button>
      )}
      <Button
        variant='contained'
        onClick={onSave}
        disabled={!isDirty || isSaving}
      >
        {isSaving ? 'Сохранение…' : 'Сохранить'}
      </Button>
    </Stack>
  )
}

export default memo(RecordCardHeader)
