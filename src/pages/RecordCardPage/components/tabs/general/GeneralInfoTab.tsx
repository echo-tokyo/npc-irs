import Grid from '@mui/material/Grid'
import FormField from '@/components/form/FormField'
import type { CitizenDetails } from '@/types/citizen'
import type { FormFieldValue } from '@/types/formField'
import { asFieldValues, validateFields } from '@/utils/formValidation'
import GeneralInfoExtraFields from './GeneralInfoExtraFields'
import { GENERAL_FIELDS } from './generalFields'

interface GeneralInfoTabProps {
  details: CitizenDetails
  districts: string[]
  showErrors: boolean
  onFieldChange: (name: string, value: FormFieldValue) => void
}

function GeneralInfoTab({
  details,
  districts,
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
              details[field.name as keyof CitizenDetails] as FormFieldValue
            }
            error={errors[field.name]}
            onChange={onFieldChange}
          />
        </Grid>
      ))}

      <GeneralInfoExtraFields
        details={details}
        districts={districts}
        onFieldChange={onFieldChange}
      />
    </Grid>
  )
}

export default GeneralInfoTab
