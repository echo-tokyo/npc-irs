import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

function SidebarLogo() {
  return (
    <Stack
      direction='row'
      spacing={1.5}
      sx={{ px: 3, py: 3, alignItems: 'center' }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2065d1 0%, #673ab7 100%)',
          boxShadow: '0 8px 16px 0 rgba(32, 101, 209, 0.24)',
        }}
      >
        <Typography sx={{ color: 'common.white', fontWeight: 700 }}>
          Р
        </Typography>
      </Box>
      <Typography variant='h6'>Реестр граждан</Typography>
    </Stack>
  )
}

export default SidebarLogo
