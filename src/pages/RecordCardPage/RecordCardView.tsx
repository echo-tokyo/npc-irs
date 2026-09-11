import { useCallback, useState, type SyntheticEvent } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useDistricts } from '@/hooks/useDistricts'
import type { CitizenGeneralInfo } from '@/types/citizen'
import RecordCardHeader from './components/RecordCardHeader'
import RecordCardTabContent from './components/RecordCardTabContent'
import { TABS, type TabValue } from './constants/tabs'
import { useRecordCardDraft } from './hooks/useRecordCardDraft'

interface RecordCardViewProps {
  citizenId: number
  initialGeneralInfo: CitizenGeneralInfo
}

function RecordCardView({
  citizenId,
  initialGeneralInfo,
}: RecordCardViewProps) {
  const { districts, isLoading: isDistrictsLoading } = useDistricts()
  const [activeTab, setActiveTab] = useState<TabValue>('general')
  const [visitedTabs, setVisitedTabs] = useState<Set<TabValue>>(
    () => new Set(['general']),
  )
  const [isSavedMessageOpen, setIsSavedMessageOpen] = useState(false)

  const draft = useRecordCardDraft(citizenId, initialGeneralInfo, visitedTabs)
  const { save } = draft

  function handleTabChange(_event: SyntheticEvent, value: TabValue) {
    setActiveTab(value)
    setVisitedTabs((prev) =>
      prev.has(value) ? prev : new Set(prev).add(value),
    )
  }

  const handleSave = useCallback(() => {
    save(() => setIsSavedMessageOpen(true))
  }, [save])

  return (
    <Stack spacing={2.5} sx={{ height: '100%' }}>
      <RecordCardHeader
        lastName={draft.details.lastName}
        firstName={draft.details.firstName}
        middleName={draft.details.middleName}
        caseNumber={draft.details.caseNumber}
        status={draft.details.status}
        isDirty={draft.isDirty}
        isSaving={draft.isSaving}
        onReset={draft.reset}
        onSave={handleSave}
      />

      <Paper
        sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', p: 3 }}>
          <RecordCardTabContent
            activeTab={activeTab}
            details={draft.details}
            districts={districts}
            isDistrictsLoading={isDistrictsLoading}
            showErrors={draft.showErrors}
            isLoading={draft.isLoading}
            onFieldChange={draft.handleFieldChange}
            onContactsFieldChange={draft.handleContactsFieldChange}
            onFamilyMembersChange={draft.handleFamilyMembersChange}
            onEducationChange={draft.handleEducationChange}
            onDocumentsChange={draft.handleDocumentsChange}
          />
        </Box>
      </Paper>

      <Snackbar
        open={isSavedMessageOpen}
        autoHideDuration={2500}
        onClose={() => setIsSavedMessageOpen(false)}
        message='Изменения сохранены'
      />
    </Stack>
  )
}

export default RecordCardView
