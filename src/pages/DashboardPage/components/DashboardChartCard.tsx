import type { ReactNode } from 'react'
import { alpha } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface DashboardChartCardProps {
  title: string
  color: string
  icon: ReactNode
  children: ReactNode
}

function DashboardChartCard({
  title,
  color,
  icon,
  children,
}: DashboardChartCardProps) {
  return (
    <Paper sx={{ p: 2.5, flex: 1, minWidth: 340 }}>
      <Stack direction='row' spacing={1.5} sx={{ alignItems: 'center' }}>
        <Avatar
          sx={{ width: 32, height: 32, bgcolor: alpha(color, 0.12), color }}
        >
          {icon}
        </Avatar>
        <Typography variant='subtitle1'>{title}</Typography>
      </Stack>
      <Divider sx={{ my: 1.5 }} />
      {children}
    </Paper>
  )
}

export default DashboardChartCard
