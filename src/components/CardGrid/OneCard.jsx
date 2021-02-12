import React from "react";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { displayRating } from "../../helpers";
import * as ROUTES from "../../constants/routes";
import * as FIELDS from "../../constants/fields";
import { IoMdArrowRoundForward } from "react-icons/io";

const OneCard = ({ project }) => (
	<>
		<div id="card">
			<div
				className="d-lg-flex justify-content-lg-center align-items-xl-start"
				id="card_image_div"
			>
				<LazyLoadImage
					className="img-fluid d-xl-flex"
					id="card_image"
					alt={"Project Background"}
					height="180px"
					effect="blur"
					src={project[FIELDS.IMAGE_URL]}
				/>
			</div>
			<h1
				className="d-sm-flex d-lg-flex justify-content-sm-center justify-content-lg-center"
				id="card_title"
			>
				{project[FIELDS.TITLE]}
			</h1>
			<p
				className="text-center d-lg-flex justify-content-lg-center"
				id="card_description"
			>
				{project[FIELDS.CARD_DESCRIPTION]}
			</p>
			<div
				className="d-sm-flex d-lg-flex justify-content-sm-center justify-content-lg-center align-items-xl-end"
				id="rating_div"
			>
				<div id="rating_stars">
					{displayRating(
						project[FIELDS.RATING],
						<FiStar />,
						"white",
						"1rem"
					)}
				</div>
			</div>
			<p className="text-center" id="publish_date">
				{moment(project[FIELDS.CREATED_AT].toDate()).calendar()}
			</p>
			<div
				className="d-sm-flex d-lg-flex justify-content-sm-center justify-content-lg-center align-items-xl-end"
				id="card_button"
			>
				<Link to={`${ROUTES.CATALOGUE}/${project[FIELDS.ID]}`}>
					<button
						className="btn btn-primary"
						id="read_more"
						type="button"
					>
						Read More
						<IoMdArrowRoundForward
							style={{ marginLeft: "5px" }}
							size="20px"
						/>
					</button>
				</Link>
			</div>
		</div>
	</>
);
export default OneCard;
