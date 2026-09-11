import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TableRowsIcon from '@mui/icons-material/TableRows'
import { useLocation } from 'react-router-dom'
import SidebarLogo from './SidebarLogo'
import SidebarNavItem from './SidebarNavItem'

export const SIDEBAR_WIDTH = 260

interface NavItem {
  to: string
  label: string
  icon: ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Дашборд', icon: <DashboardIcon fontSize='small' /> },
  {
    to: '/citizens',
    label: 'Картотека',
    icon: <TableRowsIcon fontSize='small' />,
  },
]

function isNavItemActive(pathname: string, to: string): boolean {
  return to === '/' ? pathname === '/' : pathname.startsWith(to)
}

function Sidebar() {
  const { pathname } = useLocation()

  return (
    <Box
      component='nav'
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        height: '100%',
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SidebarLogo />
      <Divider />

      <Stack sx={{ px: 2, pt: 2.5 }} spacing={0.5}>
        <Typography
          variant='caption'
          sx={{
            px: 1.5,
            color: 'text.disabled',
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          РАЗДЕЛЫ
        </Typography>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              isActive={isNavItemActive(pathname, item.to)}
            />
          ))}
        </List>
      </Stack>
    </Box>
  )
}

export default Sidebar
