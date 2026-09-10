import type {
  CitizenDetails,
  DocumentRecord,
  EducationRecord,
  FamilyMember,
} from '@/types/citizen'
import type { FormFieldValue } from '@/types/formField'
import type { TabValue } from '../constants/tabs'
import ContactsTab from './tabs/contacts/ContactsTab'
import DocumentsTab from './tabs/documents/DocumentsTab'
import EducationTab from './tabs/education/EducationTab'
import FamilyMembersTab from './tabs/family/FamilyMembersTab'
import GeneralInfoTab from './tabs/general/GeneralInfoTab'

interface RecordCardTabContentProps {
  activeTab: TabValue
  details: CitizenDetails
  districts: string[]
  showErrors: boolean
  onFieldChange: (name: string, value: FormFieldValue) => void
  onContactsFieldChange: (name: string, value: FormFieldValue) => void
  onFamilyMembersChange: (members: FamilyMember[]) => void
  onEducationChange: (records: EducationRecord[]) => void
  onDocumentsChange: (documents: DocumentRecord[]) => void
}

function RecordCardTabContent({
  activeTab,
  details,
  districts,
  showErrors,
  onFieldChange,
  onContactsFieldChange,
  onFamilyMembersChange,
  onEducationChange,
  onDocumentsChange,
}: RecordCardTabContentProps) {
  switch (activeTab) {
    case 'general':
      return (
        <GeneralInfoTab
          details={details}
          districts={districts}
          showErrors={showErrors}
          onFieldChange={onFieldChange}
        />
      )
    case 'family':
      return (
        <FamilyMembersTab
          members={details.familyMembers}
          showErrors={showErrors}
          onChange={onFamilyMembersChange}
        />
      )
    case 'education':
      return (
        <EducationTab
          records={details.education}
          showErrors={showErrors}
          onChange={onEducationChange}
        />
      )
    case 'contacts':
      return (
        <ContactsTab
          contacts={details.contacts}
          showErrors={showErrors}
          onFieldChange={onContactsFieldChange}
        />
      )
    case 'documents':
      return (
        <DocumentsTab
          documents={details.documents}
          showErrors={showErrors}
          onChange={onDocumentsChange}
        />
      )
    default:
      return null
  }
}

export default RecordCardTabContent
