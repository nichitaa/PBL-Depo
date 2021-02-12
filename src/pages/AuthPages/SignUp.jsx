import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import history from "../../constants/history";
import * as ROUTES from "../../constants/routes";

const SignUp = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { currentUser, signup } = useAuth();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// check if the password are the same
		if (passwordConfirmRef.current.value !== passwordRef.current.value) {
			return setError("Passwords dont match!");
		}
		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value)
				.then(() => {
					return history.push(ROUTES.HOME);
				})
				.catch((error) => setError(error.message));
		} catch {
			setError("FAILED TO SIGN UP!");
		}
		setLoading(false);
	};

	if (currentUser) {
		history.push(ROUTES.USER);
	}

	return (
		<>
			<div id="form_div" className="login-clean">
				<form onSubmit={handleSubmit}>
					<div className="illustration">
						<h1 id="signup_heading">Welcome</h1>
					</div>
					{error && <Alert variant="danger">{error}</Alert>}
					<div className="form-group">
						<input
							className="form-control"
							type="email"
							id="email"
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
							id="password"
							placeholder="Password"
							required
							ref={passwordRef}
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							name="password"
							placeholder="Confirm Password"
							id="password_input"
							required
							ref={passwordConfirmRef}
						/>
					</div>
					<div className="form-group d-xl-flex justify-content-xl-center">
						<button
							type="submit"
							className="btn btn-light action-button"
							id="signup"
							disabled={loading}
						>
							Sign Up
						</button>
					</div>
					<div className="w-100 text-center mt-2 text-muted">
						Already have an account?{" "}
						<Link to={ROUTES.LOG_IN}>Log In</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default SignUp;
