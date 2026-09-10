import Grid from '@mui/material/Grid'
import FormField from '@/components/form/FormField'
import type { ContactInfo } from '@/types/citizen'
import type { FormFieldValue } from '@/types/formField'
import { asFieldValues, validateFields } from '@/utils/formValidation'
import { CONTACTS_FIELDS } from './contactsFields'

interface ContactsTabProps {
  contacts: ContactInfo
  showErrors: boolean
  onFieldChange: (name: string, value: FormFieldValue) => void
}

function ContactsTab({
  contacts,
  showErrors,
  onFieldChange,
}: ContactsTabProps) {
  const errors = showErrors
    ? validateFields(CONTACTS_FIELDS, asFieldValues(contacts))
    : {}

  return (
    <Grid container spacing={2}>
      {CONTACTS_FIELDS.map((field) => (
        <Grid key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
          <FormField
            config={field}
            value={contacts[field.name as keyof ContactInfo] as FormFieldValue}
            error={errors[field.name]}
            onChange={onFieldChange}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default ContactsTab
