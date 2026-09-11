import Grid from '@mui/material/Grid'
import type { CitizenGeneralInfo } from '@/types/citizen'
import type { FormFieldValue } from '@/types/formField'
import { asFieldValues, validateFields } from '@/utils/formValidation'
import FormField from '../../form/FormField'
import GeneralInfoExtraFields from './GeneralInfoExtraFields'
import { GENERAL_FIELDS } from './generalFields'

interface GeneralInfoTabProps {
  details: CitizenGeneralInfo
  districts: string[]
  isDistrictsLoading: boolean
  showErrors: boolean
  onFieldChange: (name: string, value: FormFieldValue) => void
}

function GeneralInfoTab({
  details,
  districts,
  isDistrictsLoading,
  showErrors,
  onFieldChange,
}: GeneralInfoTabProps) {
  const errors = showErrors
    ? validateFields(GENERAL_FIELDS, asFieldValues(details))
    : {}

  return (
    <Grid container spacing={2}>
      {GENERAL_FIELDS.map((field) => (
        <Grid key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
          <FormField
            config={field}
            value={
              details[field.name as keyof CitizenGeneralInfo] as FormFieldValue
            }
            error={errors[field.name]}
            onChange={onFieldChange}
          />
        </Grid>
      ))}

      <GeneralInfoExtraFields
        district={details.district}
        livesAtRegisteredAddress={details.livesAtRegisteredAddress}
        actualAddress={details.actualAddress}
        note={details.note}
        districts={districts}
        isDistrictsLoading={isDistrictsLoading}
        onFieldChange={onFieldChange}
      />
    </Grid>
  )
}

export default GeneralInfoTab
