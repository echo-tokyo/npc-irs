import type { ReactNode } from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { alpha } from '@mui/material/styles'
import { Link } from 'react-router-dom'

interface SidebarNavItemProps {
  to: string
  label: string
  icon: ReactNode
  isActive: boolean
}

function SidebarNavItem({ to, label, icon, isActive }: SidebarNavItemProps) {
  return (
    <ListItemButton
      component={Link}
      to={to}
      selected={isActive}
      sx={{
        borderRadius: 2,
        color: isActive ? 'primary.main' : 'text.secondary',
        '&.Mui-selected': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        },
      }}
    >
      <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        slotProps={{ primary: { sx: { fontWeight: isActive ? 600 : 500 } } }}
      />
    </ListItemButton>
  )
}

export default SidebarNavItem
