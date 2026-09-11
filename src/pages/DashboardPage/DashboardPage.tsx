import type { ReactNode } from 'react'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PageLoading from '@/components/PageLoading'
import type { CitizenStatus } from '@/types/citizen'
import { STATUS_LABELS } from '@/utils/citizenLabels'
import AgeGroupBarChart from './components/AgeGroupBarChart'
import DistrictBarChart from './components/DistrictBarChart'
import RegistrationTrendChart from './components/RegistrationTrendChart'
import StatCard from './components/StatCard'
import StatusPieChart from './components/StatusPieChart'
import { useDashboardStats } from './hooks/useDashboardStats'

const STATUS_ICONS: Record<CitizenStatus, ReactNode> = {
  active: <CheckCircleOutlinedIcon />,
  archived: <ArchiveOutlinedIcon />,
  pending: <PendingActionsOutlinedIcon />,
}

const STATUS_COLORS: Record<CitizenStatus, string> = {
  active: '#2e7d32',
  archived: '#9e9e9e',
  pending: '#ed6c02',
}

function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats()

  if (isLoading || !stats) return <PageLoading />

  return (
    <Stack spacing={3} sx={{ height: '100%', overflow: 'auto' }}>
      <Typography variant='h5'>Дашборд</Typography>

      <Stack direction='row' spacing={2.5} sx={{ flexWrap: 'wrap' }}>
        <StatCard
          label='Всего записей'
          value={stats.total}
          color='#2065d1'
          icon={<GroupsOutlinedIcon />}
        />
        {stats.byStatus.map((item) => (
          <StatCard
            key={item.status}
            label={STATUS_LABELS[item.status]}
            value={item.count}
            color={STATUS_COLORS[item.status]}
            icon={STATUS_ICONS[item.status]}
          />
        ))}
      </Stack>

      <Stack direction='row' spacing={2.5} sx={{ flexWrap: 'wrap' }}>
        <StatusPieChart data={stats.byStatus} />
        <DistrictBarChart data={stats.byDistrict} />
      </Stack>

      <Stack direction='row' spacing={2.5} sx={{ flexWrap: 'wrap' }}>
        <AgeGroupBarChart data={stats.byAgeGroup} />
        <RegistrationTrendChart data={stats.byRegistrationYear} />
      </Stack>
    </Stack>
  )
}

export default DashboardPage
