import type { GridColDef } from '@mui/x-data-grid'
import type { Citizen } from '@/types/citizen'
import { GENDER_LABELS, STATUS_LABELS } from '@/utils/citizenLabels'
import { formatDate } from '@/utils/formatDate'

export const recordsColumns: GridColDef<Citizen>[] = [
  {
    field: 'fullName',
    headerName: 'ФИО',
    flex: 1.5,
    minWidth: 220,
    valueGetter: (_value, row) =>
      `${row.lastName} ${row.firstName} ${row.middleName}`,
  },
  {
    field: 'birthDate',
    headerName: 'Дата рождения',
    width: 130,
    valueFormatter: (value: Citizen['birthDate']) => formatDate(value),
  },
  {
    field: 'gender',
    headerName: 'Пол',
    width: 100,
    valueFormatter: (value: Citizen['gender']) => GENDER_LABELS[value],
  },
  {
    field: 'district',
    headerName: 'Район',
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Статус',
    width: 150,
    valueFormatter: (value: Citizen['status']) => STATUS_LABELS[value],
  },
  {
    field: 'phone',
    headerName: 'Телефон',
    width: 170,
  },
  {
    field: 'registrationDate',
    headerName: 'Дата постановки на учёт',
    width: 190,
    valueFormatter: (value: Citizen['registrationDate']) => formatDate(value),
  },
  {
    field: 'caseNumber',
    headerName: '№ дела',
    width: 130,
  },
]
