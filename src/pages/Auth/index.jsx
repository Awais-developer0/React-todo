import { Route, Routes } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'

const Auth = () => {
	return (
		<>


			<Routes>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="forgot-password" element={<ForgotPassword />} />
			</Routes>


		</>
	)
}

export default Auth
