import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as ROUTES from "../../constants/routes";
import {
	FaSignOutAlt,
	FaUserGraduate,
	FaUserPlus,
	RiLoginBoxLine,
} from "react-icons/all";

const PBLNavBar = (props) => (
	<>
		<nav
			className="navbar navbar-light navbar-expand-lg navigation-clean-button"
			id="nav-1"
		>
			<div className="container-fluid">
				<Link
					to={ROUTES.HOME}
					className="navbar-brand"
					id="nav_brand"
				/>
				<button
					data-toggle="collapse"
					className="navbar-toggler"
					data-target="#navcol"
				>
					<span className="sr-only">Toggle navigation</span>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navcol">
					<ul className="nav navbar-nav mr-auto">
						<li
							className="nav-item"
							role="presentation"
							style={{
								margin: "0 .5rem",
							}}
						>
							<Link
								to={ROUTES.HOME}
								className="nav-link"
								id="pbl-nav-link"
							>
								Home
							</Link>
						</li>

						<li
							className="nav-item"
							role="presentation"
							style={{
								margin: "0 .5rem",
							}}
						>
							<Link
								to={ROUTES.CATALOGUE}
								className="nav-link"
								id="pbl-nav-link"
							>
								Catalogue
							</Link>
						</li>

						<li
							className="nav-item"
							role="presentation"
							style={{
								margin: "0 .5rem",
							}}
						>
							<Link
								to={ROUTES.GUIDE}
								className="nav-link"
								id="pbl-nav-link"
							>
								PBL Guide
							</Link>
						</li>

						<li className="nav-item" role="presentation">
							<Link
								to={ROUTES.PROJECT_FORM}
								className="nav-link"
								id="pbl-nav-link"
							>
								Submit a Project
							</Link>
						</li>
					</ul>
					{!props.currentUser ? (
						<>
							<span className="navbar-text actions">
								<Link
									to={ROUTES.LOG_IN}
									className="btn btn-light action-button"
									id="login"
								>
									Log In
									<RiLoginBoxLine
										size="1.2rem"
										style={{
											marginBottom: "5px",
											marginLeft: "10px",
										}}
									/>
								</Link>
								<Link
									to={ROUTES.SIGN_UP}
									role="button"
									className="btn btn-light action-button"
									id="signup"
								>
									Sign Up
									<FaUserPlus
										size="1.2rem"
										style={{
											marginBottom: "5px",
											marginLeft: "10px",
										}}
									/>
								</Link>
							</span>
						</>
					) : (
						<>
							<span className="navbar-text actions">
								<Link
									to={ROUTES.USER}
									className="btn btn-light action-button"
									id="login"
								>
									{props.currentUser.email}
									<FaUserGraduate
										size="1.2rem"
										style={{
											marginBottom: "5px",
											marginLeft: "10px",
										}}
									/>
								</Link>
								<Button
									role="button"
									className="btn btn-light action-button"
									id="signup"
									style={{ borderRadius: "50px" }}
									onClick={props.handleLogout}
								>
									Sign Out
									<FaSignOutAlt
										size="1.2rem"
										style={{
											marginBottom: "5px",
											marginLeft: "10px",
										}}
									/>
								</Button>
							</span>
						</>
					)}
				</div>
			</div>
		</nav>
	</>
);

export default PBLNavBar;
