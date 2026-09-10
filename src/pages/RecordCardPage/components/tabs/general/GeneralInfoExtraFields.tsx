import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import type { CitizenDetails } from '@/types/citizen'
import type { FormFieldValue } from '@/types/formField'

interface GeneralInfoExtraFieldsProps {
  details: CitizenDetails
  districts: string[]
  onFieldChange: (name: string, value: FormFieldValue) => void
}

function GeneralInfoExtraFields({
  details,
  districts,
  onFieldChange,
}: GeneralInfoExtraFieldsProps) {
  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          select
          fullWidth
          size='small'
          label='Район'
          value={details.district}
          helperText=' '
          onChange={(event) => onFieldChange('district', event.target.value)}
        >
          {districts.map((district) => (
            <MenuItem key={district} value={district}>
              {district}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid
        size={{ xs: 12, sm: 6, md: 4 }}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={details.livesAtRegisteredAddress}
              onChange={(event) =>
                onFieldChange('livesAtRegisteredAddress', event.target.checked)
              }
            />
          }
          label='Фактический адрес совпадает с регистрацией'
        />
      </Grid>

      {!details.livesAtRegisteredAddress && (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            size='small'
            label='Фактический адрес'
            value={details.actualAddress}
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
          value={details.note}
          onChange={(event) => onFieldChange('note', event.target.value)}
        />
      </Grid>
    </>
  )
}

export default GeneralInfoExtraFields
