import React from "react";

const MentorReview = ({ imageURL, reviewText }) => {
	return (
		<>
			<div
				className="d-xl-flex justify-content-xl-center align-items-xl-center"
				id="concept_div"
			>
				<div id="mentor-review-design">
					<div
						className="d-xl-flex justify-content-xl-center align-items-xl-center"
						id="mentor_review_title"
					>
						<h1 id="team_title-1">Mentor's review</h1>
					</div>
					<div className="d-xl-flex justify-content-xl-center align-items-xl-center">
						<img
							id="mentor_photo"
							src={imageURL}
							alt="Mentor ProfiProblemle Pic"
						/>
						<p
							className="d-xl-flex justify-content-xl-center align-items-xl-center"
							id="mentor_review_text"
						>
							{reviewText}
							<br />
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default MentorReview;
