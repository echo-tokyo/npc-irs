import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

function TabLoading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
      <CircularProgress size={28} />
    </Box>
  )
}

export default TabLoading
