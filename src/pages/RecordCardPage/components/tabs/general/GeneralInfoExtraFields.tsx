import { memo } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import type { FormFieldValue } from '@/types/formField'
import DistrictField from './DistrictField'

interface GeneralInfoExtraFieldsProps {
  district: string
  livesAtRegisteredAddress: boolean
  actualAddress: string
  note: string
  districts: string[]
  isDistrictsLoading: boolean
  onFieldChange: (name: string, value: FormFieldValue) => void
}

// Принимает конкретные поля, а не весь details — иначе правка на любой
// другой вкладке пересоздавала бы этот блок без надобности.
function GeneralInfoExtraFields({
  district,
  livesAtRegisteredAddress,
  actualAddress,
  note,
  districts,
  isDistrictsLoading,
  onFieldChange,
}: GeneralInfoExtraFieldsProps) {
  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <DistrictField
          district={district}
          districts={districts}
          isLoading={isDistrictsLoading}
          onChange={(value) => onFieldChange('district', value)}
        />
      </Grid>

      <Grid
        size={{ xs: 12, sm: 6, md: 4 }}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={livesAtRegisteredAddress}
              onChange={(event) =>
                onFieldChange('livesAtRegisteredAddress', event.target.checked)
              }
            />
          }
          label='Фактический адрес совпадает с регистрацией'
        />
      </Grid>

      {!livesAtRegisteredAddress && (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            size='small'
            label='Фактический адрес'
            value={actualAddress}
            onChange={(event) =>
              onFieldChange('actualAddress', event.target.value)
            }
          />
        </Grid>
      )}

      <Grid size={12}>
        <TextField
          fullWidth
          multiline
          minRows={3}
          size='small'
          label='Примечание'
          value={note}
          onChange={(event) => onFieldChange('note', event.target.value)}
        />
      </Grid>
    </>
  )
}

export default memo(GeneralInfoExtraFields)
