import { Link, useNavigate } from 'react-router-dom'
import { Typography, Form, Input, Button } from "antd"
import { useState } from 'react'
import { useAuth } from '../../context/Auth'
const { Title, Paragraph } = Typography
const { Item } = Form
const initialState = { email: "", password: "" }
const Login = () => {
	const navigate = useNavigate()
	const { dispatch } = useAuth()
	const [state, setState] = useState(initialState)
	const [isProcessing, setIsProcessing] = useState(false)

	const handleChange = e => setState(s => ({ ...state, [e.target.name]: e.target.value }))
	const handleLogin = () => {

		const { email, password } = state

		setIsProcessing(true)
		const users = JSON.parse(localStorage.getItem("users")) || []

		const user = users.find(user => user.email === email && user.password === password)
		if (!user) {
			setIsProcessing(false)
			return window.toastify("Invalid email or password", "error")
		}

		users.push(user)
		setTimeout(() => {
			localStorage.setItem("user", JSON.stringify(user))
			dispatch({ isAuth: true, user })
			navigate("/")
			setIsProcessing(false)
			window.toastify("Login successfull", "success")
		}, 500)
	}
	return (
		<main className="auth flex-center">
			<div className="container">
				<div className="card mx-auto p-3">
					<Title level={1} className="text-center">
						Login
					</Title>
					<Paragraph className='text-center'>Not have an account?<Link to="/auth/register">register</Link></Paragraph>
					<Form layout="vertical">

						<Item label="Email">
							<Input type="email" size="large" placeholder="Enter Your email" name='email' onChange={handleChange} required />
						</Item>
						<Item label="Passowrd">
							<Input.Password size="large" placeholder="Enter Your Password" name='password' onChange={handleChange} required />
						</Item>

						<Button size='large' type='primary' block htmlType='submit' loading={isProcessing} onClick={handleLogin}>Login</Button>

					</Form>

				</div>
			</div>
		</main>
	)
}

export default Login
