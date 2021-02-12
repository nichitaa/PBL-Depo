import React from "react";
import * as FIELDS from "../../../constants/fields";
import { displayRating } from "../../../helpers";
import moment from "moment";
import { FaRegStar } from "react-icons/all";

const ProjectFeedbacks = ({ feedbacks }) => {
	const styles = [
		"feedback-design-1",
		"feedback-design-2",
		"feedback-design-3",
	];
	const getRandomStyle = () => {
		return styles[Math.floor(Math.random() * styles.length)];
	};
	return (
		<>
			{feedbacks.length > 0 ? (
				feedbacks.map((feedback) => {
					return (
						<div
							className="d-xl-flex justify-content-xl-center"
							id="feedback-design-div"
							key={feedback[FIELDS.FEEDBACK_CREATEDAT]}
						>
							<div id={getRandomStyle()}>
								<div
									className="d-xl-flex justify-content-xl-center align-items-xl-center"
									id="user_feedback"
								>
									<h2
										id="user_email"
										style={{ fontSize: "25px" }}
									>
										From: {feedback[FIELDS.FEEDBACK_EMAIL]}
									</h2>
								</div>
								<p id="user_feedback">
									<br />
									{feedback[FIELDS.FEEDBACK_MESSAGE]}
									<br />
									<br />
								</p>
								<div
									className="d-xl-flex justify-content-xl-center align-items-xl-start"
									id="user_feedback_rating"
								>
									<div id="rating_stars">
										{displayRating(
											feedback[FIELDS.FEEDBACK_RATING],
											<FaRegStar />,
											"white",
											"1.5rem"
										)}
									</div>
								</div>
								<div
									className="d-xl-flex justify-content-xl-end"
									id="date-and-time"
								>
									<p id="feed_date">
										{moment(
											feedback[
												FIELDS.FEEDBACK_CREATEDAT
											].toDate()
										).calendar()}
									</p>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<></>
			)}
		</>
	);
};

export default ProjectFeedbacks;
