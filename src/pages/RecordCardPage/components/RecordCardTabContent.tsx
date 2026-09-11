import type {
  CitizenDetailsDraft,
  DocumentRecord,
  EducationRecord,
  FamilyMember,
} from '@/types/citizen'
import type { FormFieldValue } from '@/types/formField'
import type { TabValue } from '../constants/tabs'
import type { LazySectionsLoading } from '../hooks/useRecordCardDraft'
import ContactsTab from './tabs/contacts/ContactsTab'
import DocumentsTab from './tabs/documents/DocumentsTab'
import EducationTab from './tabs/education/EducationTab'
import FamilyMembersTab from './tabs/family/FamilyMembersTab'
import GeneralInfoTab from './tabs/general/GeneralInfoTab'
import TabLoading from './tabs/shared/TabLoading'

interface RecordCardTabContentProps {
  activeTab: TabValue
  details: CitizenDetailsDraft
  districts: string[]
  isDistrictsLoading: boolean
  showErrors: boolean
  isLoading: LazySectionsLoading
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
  isDistrictsLoading,
  showErrors,
  isLoading,
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
          isDistrictsLoading={isDistrictsLoading}
          showErrors={showErrors}
          onFieldChange={onFieldChange}
        />
      )
    case 'family':
      if (isLoading.familyMembers || !details.familyMembers)
        return <TabLoading />
      return (
        <FamilyMembersTab
          members={details.familyMembers}
          showErrors={showErrors}
          onChange={onFamilyMembersChange}
        />
      )
    case 'education':
      if (isLoading.education || !details.education) return <TabLoading />
      return (
        <EducationTab
          records={details.education}
          showErrors={showErrors}
          onChange={onEducationChange}
        />
      )
    case 'contacts':
      if (isLoading.contacts || !details.contacts) return <TabLoading />
      return (
        <ContactsTab
          contacts={details.contacts}
          showErrors={showErrors}
          onFieldChange={onContactsFieldChange}
        />
      )
    case 'documents':
      if (isLoading.documents || !details.documents) return <TabLoading />
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
