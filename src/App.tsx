import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import RecordCardPage from '@/pages/RecordCardPage'
import RecordsTablePage from '@/pages/RecordsTablePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<RecordsTablePage />} />
          <Route path='citizens/:id' element={<RecordCardPage />} />
          <Route path='dashboard' element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
