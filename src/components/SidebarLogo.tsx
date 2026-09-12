import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

function SidebarLogo() {
  return (
    <Stack
      direction='row'
      spacing={1.5}
      sx={{ px: 3, py: 3, alignItems: 'center' }}
    >
      <Avatar
        variant='rounded'
        sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}
      >
        <AssignmentIndOutlinedIcon fontSize='small' />
      </Avatar>
      <Typography variant='h6'>Реестр граждан</Typography>
    </Stack>
  )
}

export default SidebarLogo
