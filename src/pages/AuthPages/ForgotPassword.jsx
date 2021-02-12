import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as ROUTES from "../../constants/routes";

export default function ForgotPassword() {
	const emailRef = useRef();

	const { resetPassword } = useAuth();

	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage(
				"Please check your inbox. A reset password email has been sent to you!"
			);
		} catch {
			setError("Failed to reset password!");
		}
		setLoading(false);
	};

	return (
		<>
			<div id="form_div" className="login-clean">
				<form onSubmit={handleSubmit}>
					<div className="illustration">
						<h1 id="login_heading">Reset Password</h1>
					</div>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<div className="form-group">
						<input
							className="form-control"
							type="email"
							name="email"
							placeholder="Email"
							required
							ref={emailRef}
						/>
					</div>

					<div className="form-group d-xl-flex justify-content-xl-center">
						<button
							type="submit"
							className="btn btn-primary btn-block"
							id="login"
							disabled={loading}
						>
							Reset
						</button>
					</div>

					<div className="w-100 text-center mt-2">
						<Link to="/login">Log In</Link>
					</div>
					<div className="w-100 text-center mt-2">
						Need an account?{" "}
						<Link to={ROUTES.SIGN_UP}> Sign Up</Link>
					</div>
				</form>
			</div>
		</>
	);
}
