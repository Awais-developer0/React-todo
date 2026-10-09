import { Link } from 'react-router-dom'
import { Typography, Form, Input, Button } from "antd"
import { useState } from 'react'
import Password from 'antd/es/input/Password'
const { Title, Paragraph } = Typography
const { Item } = Form
const initialState = { fullName: "", email: "", password: "", confirmPassword: "" }
const Register = () => {
	const [state, setState] = useState(initialState)
	const [isProcessing, setIsProcessing] = useState(false)

	const handleChange = e => setState(s => ({ ...state, [e.target.name]: e.target.value }))
	const handleRegister = () => {

		const { fullName, email, password, confirmPassword } = state
		const name = fullName.trim()
		if (name < 3) {
			return window.toastify("Enter your Full Name", "error")
		}
		if (!isValidEmail(email)) {
			return window.toastify("Enter your valid email", "error")
		}
		if (password.length < 6) {
			return window.toastify("Enter your passowrd", "error")
		}
		if (confirmPassword !== password) {
			return window.toastify("Passowrd do not match", "error")
		}
		const user = { uid: window.getRandomId(), fullName, email, password, status: "active", role: "customer" }
		setIsProcessing(true)
		const users = JSON.parse(localStorage.getItem("users")) || []

		const isUserFound = users.find(user => user.email === email)
		if (isUserFound) {
			setIsProcessing(false)
			return window.toastify("User already exists", "error")
		}

		users.push(user)
		localStorage.setItem("users", JSON.stringify(users))

		setTimeout(() => {
			setIsProcessing(false)
			window.toastify("A new user successfully registered", "success")
		}, 500)
	}
	return (
		<main className="auth flex-center">
			<div className="container">
				<div className="card mx-auto p-3">
					<Title level={1} className="text-center">
						Register
					</Title>
					<Paragraph className='text-center'>Already have an account?<Link to="/auth/login">Login</Link></Paragraph>
					<Form layout="vertical">
						<Item label="Full Name">
							<Input type="text" size="large" placeholder="Enter Your Full Name" name='fullName' onChange={handleChange} required />
						</Item>
						<Item label="Email">
							<Input type="email" size="large" placeholder="Enter Your email" name='email' onChange={handleChange} required />
						</Item>
						<Item label="Passowrd">
							<Input.Password size="large" placeholder="Enter Your Password" name='password' onChange={handleChange} required />
						</Item>
						<Item label="Confirm Passowrd">
							<Input.Password size="large" placeholder="Enter Your confirm passowrd" name='confirmPassword' onChange={handleChange} required />
						</Item>
						<Button size='large' type='primary' block htmlType='submit' loading={isProcessing} onClick={handleRegister}>Register</Button>

					</Form>

				</div>
			</div>
		</main>
	)
}

export default Register
