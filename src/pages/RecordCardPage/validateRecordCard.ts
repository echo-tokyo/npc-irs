import type { CitizenDetailsDraft } from '@/types/citizen'
import {
  asFieldValues,
  hasErrors,
  validateFields,
} from '@/utils/formValidation'
import { CONTACTS_FIELDS } from './components/tabs/contacts/contactsFields'
import { DOCUMENT_FIELDS } from './components/tabs/documents/documentFields'
import { EDUCATION_FIELDS } from './components/tabs/education/educationFields'
import { FAMILY_MEMBER_FIELDS } from './components/tabs/family/familyMemberFields'
import { GENERAL_FIELDS } from './components/tabs/general/generalFields'

export function hasValidationErrors(details: CitizenDetailsDraft): boolean {
  const generalErrors = validateFields(GENERAL_FIELDS, asFieldValues(details))
  if (hasErrors(generalErrors)) return true

  if (details.contacts) {
    const contactsErrors = validateFields(
      CONTACTS_FIELDS,
      asFieldValues(details.contacts),
    )
    if (hasErrors(contactsErrors)) return true
  }

  const listsAreValid = [
    ...(details.familyMembers ?? []).map((item) =>
      validateFields(FAMILY_MEMBER_FIELDS, asFieldValues(item)),
    ),
    ...(details.education ?? []).map((item) =>
      validateFields(EDUCATION_FIELDS, asFieldValues(item)),
    ),
    ...(details.documents ?? []).map((item) =>
      validateFields(DOCUMENT_FIELDS, asFieldValues(item)),
    ),
  ].every((errors) => !hasErrors(errors))

  return !listsAreValid
}
