import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import { BarChart } from '@mui/x-charts/BarChart'
import DashboardChartCard from './DashboardChartCard'

const COLOR = '#5b21b6'

interface DistrictBarChartProps {
  data: { district: string; count: number }[]
}

function DistrictBarChart({ data }: DistrictBarChartProps) {
  return (
    <DashboardChartCard
      title='По районам'
      color={COLOR}
      icon={<PlaceOutlinedIcon fontSize='small' />}
    >
      <BarChart
        xAxis={[{ scaleType: 'band', data: data.map((item) => item.district) }]}
        series={[{ data: data.map((item) => item.count), color: COLOR }]}
        height={240}
      />
    </DashboardChartCard>
  )
}

export default DistrictBarChart
