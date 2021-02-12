import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import history from "../../constants/history";
import * as ROUTES from "../../constants/routes";

export default function LogIn() {
	const { currentUser } = useAuth();

	const emailRef = useRef();
	const passwordRef = useRef();

	const { login } = useAuth();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// if user is already logged in ,pop up alert message
	if (currentUser) {
		alert("You are already logged in!");
		history.push(ROUTES.USER);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			await login(
				emailRef.current.value,
				passwordRef.current.value,
				setError
			)
				.then(() => history.push(ROUTES.HOME))
				.catch((error) => setError(error.message));
		} catch {
			setError("FAILED TO LOG IN");
		}
		setLoading(false);
	};

	return (
		<>
			<div id="form_div" className="login-clean">
				<form onSubmit={handleSubmit}>
					<div className="illustration">
						<h1 id="login_heading">Welcome Back</h1>
					</div>
					{error && <Alert variant="danger">{error}</Alert>}
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
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							name="password"
							placeholder="Password"
							required
							ref={passwordRef}
						/>
					</div>
					<div className="form-group d-xl-flex justify-content-xl-center">
						<button
							type="submit"
							className="btn btn-primary btn-block"
							id="login"
							disabled={loading}
						>
							Log In
						</button>
					</div>

					<div className="w-100 text-center mt-2 text-muted">
						Forgot your password?{" "}
						<Link to={ROUTES.FORGOT_PASSWORD}> Click Here</Link>
					</div>

					<div className="w-100 text-center mt-2 text-muted">
						Need an account?{" "}
						<Link to={ROUTES.SIGN_UP}> Sign Up</Link>
					</div>
				</form>
			</div>
		</>
	);
}
