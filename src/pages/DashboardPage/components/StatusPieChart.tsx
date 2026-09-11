import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined'
import { PieChart } from '@mui/x-charts/PieChart'
import type { CitizenStatus } from '@/types/citizen'
import { STATUS_LABELS } from '@/utils/citizenLabels'
import DashboardChartCard from './DashboardChartCard'

const STATUS_COLORS: Record<CitizenStatus, string> = {
  active: '#2e7d32',
  archived: '#9e9e9e',
  pending: '#ed6c02',
}

interface StatusPieChartProps {
  data: { status: CitizenStatus; count: number }[]
}

function StatusPieChart({ data }: StatusPieChartProps) {
  return (
    <DashboardChartCard
      title='По статусам'
      color='#673ab7'
      icon={<DonutLargeOutlinedIcon fontSize='small' />}
    >
      <PieChart
        series={[
          {
            data: data.map((item) => ({
              id: item.status,
              value: item.count,
              label: STATUS_LABELS[item.status],
              color: STATUS_COLORS[item.status],
            })),
            innerRadius: 50,
            paddingAngle: 2,
          },
        ]}
        height={240}
      />
    </DashboardChartCard>
  )
}

export default StatusPieChart
