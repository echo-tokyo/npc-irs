import { useId, useRef } from 'react'
import RecordListEditor from '@/components/form/RecordListEditor'
import type { FamilyMember } from '@/types/citizen'
import { FAMILY_MEMBER_FIELDS } from './familyMemberFields'

interface FamilyMembersTabProps {
  members: FamilyMember[]
  showErrors: boolean
  onChange: (members: FamilyMember[]) => void
}

function FamilyMembersTab({
  members,
  showErrors,
  onChange,
}: FamilyMembersTabProps) {
  const idPrefix = useId()
  const nextIndexRef = useRef(0)

  function createEmptyMember(): FamilyMember {
    nextIndexRef.current += 1
    return {
      id: `${idPrefix}-${nextIndexRef.current}`,
      fullName: '',
      relationship: 'other',
      birthDate: '',
      phone: '',
    }
  }

  return (
    <RecordListEditor
      items={members}
      fields={FAMILY_MEMBER_FIELDS}
      addLabel='Добавить члена семьи'
      showErrors={showErrors}
      createItem={createEmptyMember}
      onChange={onChange}
    />
  )
}

export default FamilyMembersTab
