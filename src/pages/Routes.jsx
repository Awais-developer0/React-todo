import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { useAuth } from '../context/Auth'
import ProtectedRoute from '../components/misc/ProtectedRoute'
import Todos from './Dashboard/Todos'

const AppRoutes = () => {
  const { isAuth } = useAuth()
  return (
    <RouterRoutes>
      <Route path='/*' element={<Frontend />} />
      <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} />
      <Route path='/dashboard' element={<ProtectedRoute Component={Dashboard} />} />
      <Route path='todos/*' element={<ProtectedRoute Component={Todos} />} />
    </RouterRoutes>
  )
}

export default AppRoutes