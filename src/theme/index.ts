import { createTheme } from '@mui/material/styles'
import { ruRU as coreRuRU } from '@mui/material/locale'
import { ruRU as dataGridRuRU } from '@mui/x-data-grid/locales'

export const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        main: '#2065d1',
      },
      secondary: {
        main: '#673ab7',
      },
      background: {
        default: '#f4f6f8',
        paper: '#ffffff',
      },
      divider: 'rgba(145, 158, 171, 0.2)',
    },
    typography: {
      fontFamily: [
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Arial',
        'sans-serif',
      ].join(','),
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow:
              '0 0 2px rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow:
              '0 0 2px rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
          },
        },
      },
    },
  },
  coreRuRU,
  dataGridRuRU,
  {
    components: {
      MuiDataGrid: {
        defaultProps: {
          localeText: {
            paginationDisplayedRows: ({
              from,
              to,
              count,
            }: {
              from: number
              to: number
              count: number
            }) => `${from}–${to} из ${count}`,
          },
        },
      },
    },
  },
)
