import { useState, type SyntheticEvent } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useDistricts } from '@/hooks/useDistricts'
import type { CitizenDetails } from '@/types/citizen'
import RecordCardHeader from './components/RecordCardHeader'
import RecordCardTabContent from './components/RecordCardTabContent'
import { TABS, type TabValue } from './constants/tabs'
import { useRecordCardDraft } from './hooks/useRecordCardDraft'

interface RecordCardViewProps {
  initialDetails: CitizenDetails
}

function RecordCardView({ initialDetails }: RecordCardViewProps) {
  const districts = useDistricts()
  const draft = useRecordCardDraft(initialDetails)
  const [activeTab, setActiveTab] = useState<TabValue>('general')
  const [isSavedMessageOpen, setIsSavedMessageOpen] = useState(false)

  function handleTabChange(_event: SyntheticEvent, value: TabValue) {
    setActiveTab(value)
  }

  function handleSave() {
    draft.save(() => setIsSavedMessageOpen(true))
  }

  return (
    <Stack spacing={2.5} sx={{ height: '100%' }}>
      <RecordCardHeader
        details={draft.details}
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
            showErrors={draft.showErrors}
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
