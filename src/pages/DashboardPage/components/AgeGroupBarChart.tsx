import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'
import { BarChart } from '@mui/x-charts/BarChart'
import DashboardChartCard from './DashboardChartCard'

const COLOR = '#0277bd'

interface AgeGroupBarChartProps {
  data: { label: string; count: number }[]
}

function AgeGroupBarChart({ data }: AgeGroupBarChartProps) {
  return (
    <DashboardChartCard
      title='По возрасту'
      color={COLOR}
      icon={<CakeOutlinedIcon fontSize='small' />}
    >
      <BarChart
        xAxis={[{ scaleType: 'band', data: data.map((item) => item.label) }]}
        series={[{ data: data.map((item) => item.count), color: COLOR }]}
        height={240}
      />
    </DashboardChartCard>
  )
}

export default AgeGroupBarChart
