import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import * as ROUTES from "../../../../constants/routes";
import { FaUserAstronaut, GiMassDriver } from "react-icons/all";
import peoples from "./peoples.png";

const Intro = () => {
	const { currentUser } = useAuth();
	return (
		<>
			<div id="scroll1">
				<p
					className="d-flex d-md-flex d-lg-flex justify-content-center justify-content-md-center justify-content-lg-center"
					data-aos="fade-down"
					data-aos-duration="800"
					data-aos-once="true"
					id="title"
				>
					<br />
					PBL PROJECTS
				</p>
				<p
					className="d-flex d-md-flex d-lg-flex justify-content-center justify-content-md-center justify-content-lg-center align-items-lg-center"
					data-aos="fade-down"
					data-aos-duration="800"
					data-aos-delay="300"
					data-aos-once="true"
					id="subtitle"
				>
					<br />
					NOW CLOSER THAN EVER
					<br />
					<br />
				</p>
				<div
					className="d-flex d-md-flex d-lg-flex justify-content-center justify-content-md-center justify-content-lg-center"
					data-aos="fade-down"
					data-aos-duration="800"
					data-aos-delay="400"
					data-aos-once="true"
				>
					{!currentUser ? (
						<Link
							to={ROUTES.SIGN_UP}
							className="btn btn-light action-button"
							role="button"
							id="signup"
						>
							Sign Up
							<FaUserAstronaut
								style={{
									marginBottom: "2px",
									marginLeft: "5px",
								}}
							/>
						</Link>
					) : (
						<Link
							to={ROUTES.CATALOGUE}
							className="btn btn-light action-button"
							role="button"
							id="login"
						>
							Catalogue
							<GiMassDriver
								style={{
									marginBottom: "2px",
									marginLeft: "5px",
								}}
							/>
						</Link>
					)}
				</div>
				<img
					style={{
						width: "570px",
						height: "450px",
					}}
					src={peoples}
					alt="pbl hOOmans"
				/>
			</div>
		</>
	);
};

export default Intro;
