import { Link } from 'react-router-dom'

const ForgotPassword = () => {
	return (
		<section className="mx-auto" style={{ maxWidth: '480px' }}>
			<h1 className="mb-4">Forgot password</h1>
			<form onSubmit={(event) => event.preventDefault()}>
				<div className="mb-3">
					<label className="form-label" htmlFor="forgot-email">Email</label>
					<input className="form-control" id="forgot-email" type="email" required />
				</div>
				<button className="btn btn-primary" type="submit">Send reset link</button>
			</form>
			<Link className="d-block mt-3" to="/auth/login">Back to login</Link>
		</section>
	)
}

export default ForgotPassword
