import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";

const InfoSection = () => {
	return (
		<>
			<div
				className="d-lg-flex justify-content-lg-center align-items-lg-center"
				id="scroll3"
			>
				<div className="container" id="scroll3_container">
					<div className="row" id="scroll3_row">
						<div
							className="col-md-6 d-md-flex d-lg-flex justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center"
							id="scroll3_column1"
						>
							<div id="scroll3_column1_text">
								<div>
									<p
										className="text-center d-sm-flex d-lg-flex justify-content-sm-center align-items-sm-center justify-content-lg-center"
										data-aos="fade-down"
										data-aos-duration="800"
										data-aos-once="true"
										id="scroll3_column1_paragraph"
									>
										IF YOU WANT TO FIND&nbsp;
										<br />
										OUT WHAT IS PBL&nbsp;
										<br />
										AND HOW TO START&nbsp;
										<br />
										YOUR PBL PROJECT
										<br />
										<br />
									</p>
								</div>
								<div
									className="d-flex d-sm-flex d-lg-flex justify-content-center"
									data-aos="fade-down"
									data-aos-duration="800"
									data-aos-delay="300"
									data-aos-once="true"
									id="scroll3_button_div"
								>
									<Link to={ROUTES.GUIDE}>
										<button
											className="btn btn-primary"
											id="signup"
											type="button"
										>
											Read More
										</button>
									</Link>
								</div>
							</div>
						</div>
						<div
							className="col-md-6 d-flex d-md-flex justify-content-center align-items-center justify-content-md-center align-items-md-center"
							id="scroll3_column2"
						>
							<div>
								<div
									className="d-lg-flex justify-content-lg-start"
									data-aos="fade-left"
									data-aos-duration="800"
									data-aos-once="true"
									id="find_icon"
								>
									<div className="display-none">
										<span
											className="d-lg-flex justify-content-lg-start"
											id="zoom_icon"
										>
											&nbsp; &nbsp;&nbsp;
										</span>
									</div>
									<div className="d-lg-flex align-items-lg-center justify-content-xl-center">
										<p
											className="text-center d-lg-flex justify-content-lg-center"
											id="zoom_paragraph"
										>
											<i className="icon ion-arrow-right-c display-true" />
											&nbsp; &nbsp;Search through our
											project&nbsp;&nbsp;
											<br />
											&nbsp;catalogue and&nbsp;get
											inspired
										</p>
									</div>
								</div>
								<div
									className="d-lg-flex justify-content-lg-start"
									data-aos="fade-left"
									data-aos-duration="800"
									data-aos-delay="200"
									data-aos-once="true"
									id="list_div"
								>
									<div className="display-none">
										<span
											className="d-lg-flex justify-content-lg-start"
											id="list_icon"
										>
											&nbsp; &nbsp;&nbsp;
										</span>
									</div>
									<div className="d-lg-flex align-items-lg-center">
										<p
											className="text-center d-lg-flex justify-content-lg-center"
											id="list_paragraph"
										>
											<i className="icon ion-arrow-right-c display-true" />
											&nbsp; &nbsp;Upload and edit
											projects&nbsp;
											<br />
											&nbsp;of your own
										</p>
									</div>
								</div>
								<div
									className="d-lg-flex justify-content-lg-start"
									data-aos="fade-left"
									data-aos-duration="800"
									data-aos-delay="400"
									data-aos-once="true"
									id="add_team_icon"
								>
									<div className="d-lg-flex display-none">
										<span
											className="d-lg-flex justify-content-lg-start"
											id="add_team_icon2"
										>
											&nbsp; &nbsp;&nbsp;
										</span>
									</div>
									<div className="d-lg-flex align-items-lg-center">
										<p
											className="text-center d-lg-flex justify-content-lg-center"
											id="add_team_paragraph"
										>
											<i className="icon ion-arrow-right-c display-true" />
											&nbsp; &nbsp;Add your teammates on
											<br />
											&nbsp; your project page
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InfoSection;
