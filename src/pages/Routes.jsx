import { Routes as RouterRoutes, Route } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'

const AppRoutes = () => {
  return (
    <RouterRoutes>
      <Route path='/*' element={<Frontend />} />
      <Route path='/auth/*' element={<Auth />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </RouterRoutes>
  )
}

export default AppRoutes