import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";
import { useDB } from "../../../context/DBContext";

const FeedbackForm = () => {
	const { currentUser } = useAuth();
	const { sendFeedback } = useDB();

	const [feedback, setFeedback] = useState("");
	// if user will not pick a rating, the default will be 5
	const [userRating, setUserRating] = useState(5);

	const sendUserFeedback = async (e) => {
		e.preventDefault();
		if (!currentUser) {
			alert("Please sign in / sign up to rate this project!");
		} else {
			await sendFeedback(feedback, userRating);
			setFeedback((prevState) => "");
			setUserRating(5);
		}
	};

	const rateTheProject = (e) => {
		if (!currentUser) {
			alert("Please sign in / sign up to rate this project!");
		} else {
			setUserRating((prevState) => Number(e.target.value));
		}
	};

	return (
		<>
			<div
				className="d-xl-flex justify-content-xl-center align-items-xl-center"
				id="concept_div"
			>
				<form id="user-review-design" onSubmit={sendUserFeedback}>
					<div
						className="d-xl-flex justify-content-xl-center align-items-xl-center"
						id="user_review_title"
					>
						<h1 id="team_title">Leave Feedback</h1>
					</div>
					<div className="d-xl-flex justify-content-xl-center align-items-xl-center">
						<input
							type="text"
							id="feed_input"
							placeholder="Your Feedback"
							name={"feedbackInput"}
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							maxLength="300"
							required
						/>
					</div>
					<div
						className="d-xl-flex justify-content-xl-center align-items-xl-center"
						id="feed_button_div"
					>
						<div id="rating_stars">
							<Button
								style={{ marginRight: "5px" }}
								variant="danger"
								onClick={rateTheProject}
								value={1}
							>
								1
							</Button>
							<Button
								style={{ marginRight: "5px" }}
								variant="outline-danger"
								onClick={rateTheProject}
								value={2}
							>
								2
							</Button>
							<Button
								style={{ marginRight: "5px" }}
								variant="outline-warning"
								onClick={rateTheProject}
								value={3}
							>
								3
							</Button>
							<Button
								style={{ marginRight: "5px" }}
								variant="outline-success"
								onClick={rateTheProject}
								value={4}
							>
								4
							</Button>
							<Button
								style={{ marginRight: "5px" }}
								variant="success"
								onClick={rateTheProject}
								value={5}
							>
								5
							</Button>
						</div>
					</div>
					<div
						className="d-xl-flex justify-content-xl-center align-items-xl-center"
						id="feed_button_div"
					>
						<button
							className="btn btn-primary"
							id="signup"
							type="submit"
						>
							Submit Feedback
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default FeedbackForm;
