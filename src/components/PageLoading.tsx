import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

function PageLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        pt: 8,
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default PageLoading
