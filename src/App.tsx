import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/AppLayout'
import PageLoading from '@/components/PageLoading'

const RecordsTablePage = lazy(() => import('@/pages/RecordsTablePage'))
const RecordCardPage = lazy(() => import('@/pages/RecordCardPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<RecordsTablePage />} />
            <Route path='citizens/:id' element={<RecordCardPage />} />
            <Route path='dashboard' element={<DashboardPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
