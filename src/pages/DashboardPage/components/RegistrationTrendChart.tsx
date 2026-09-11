import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import { LineChart } from '@mui/x-charts/LineChart'
import DashboardChartCard from './DashboardChartCard'

const COLOR = '#c2185b'

interface RegistrationTrendChartProps {
  data: { year: string; count: number }[]
}

function RegistrationTrendChart({ data }: RegistrationTrendChartProps) {
  return (
    <DashboardChartCard
      title='Постановка на учёт по годам'
      color={COLOR}
      icon={<TrendingUpOutlinedIcon fontSize='small' />}
    >
      <LineChart
        xAxis={[{ scaleType: 'point', data: data.map((item) => item.year) }]}
        series={[
          { data: data.map((item) => item.count), color: COLOR, area: true },
        ]}
        height={240}
      />
    </DashboardChartCard>
  )
}

export default RegistrationTrendChart
