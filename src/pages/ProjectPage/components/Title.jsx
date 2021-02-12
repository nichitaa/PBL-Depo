import React from "react";
import { displayRating } from "../../../helpers";
import { FiStar } from "react-icons/fi";
import moment from "moment";

const Title = ({ title, imageURL, rating, userEmail, createdAt }) => {
	return (
		<>
			<div className="row" id="project_page_row_1">
				<div
					className="col-xl-5 d-xl-flex justify-content-xl-end align-items-xl-center"
					id="project_page_col_1"
				>
					<div id="project_title_background">
						<div
							className="d-xl-flex justify-content-xl-center align-items-xl-end"
							id="project_title_div"
						>
							<h1
								className="d-xl-flex align-items-xl-end"
								id="project_title"
							>
								<br />
								{title}
								<br />
							</h1>
						</div>
						<div
							className="d-xl-flex justify-content-xl-center align-items-xl-center"
							id="project_rating"
						>
							<div id="rating_stars_pr_page">
								<span id="rating_text" />
								{displayRating(
									rating,
									<FiStar />,
									"#F4D03F",
									"1.5rem"
								)}
							</div>
						</div>
						{createdAt && (
							<div
								className="text-center"
								style={{ color: "#85be9a" }}
							>
								Uploaded by: {userEmail} <br />
								{moment(createdAt.toDate()).calendar()}
							</div>
						)}
					</div>
				</div>
				<div
					className="col-xl-7 d-xl-flex justify-content-xl-start align-items-xl-center"
					id="project_page_col_1"
				>
					<div id="project_profile_image_div">
						<img
							id="project_profile_image"
							width="100%"
							height="100%"
							src={imageURL}
							alt="project"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Title;
