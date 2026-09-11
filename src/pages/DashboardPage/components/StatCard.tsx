import type { ReactNode } from 'react'
import { alpha } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface StatCardProps {
  label: string
  value: number
  color: string
  icon: ReactNode
}

function StatCard({ label, value, color, icon }: StatCardProps) {
  return (
    <Paper sx={{ p: 2.5, flex: 1, minWidth: 200 }}>
      <Stack
        direction='row'
        spacing={2}
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Stack spacing={0.5}>
          <Typography variant='body2' color='text.secondary'>
            {label}
          </Typography>
          <Typography variant='h3' sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
        </Stack>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: alpha(color, 0.12),
            color,
          }}
        >
          {icon}
        </Avatar>
      </Stack>
    </Paper>
  )
}

export default StatCard
