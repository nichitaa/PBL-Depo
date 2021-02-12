import React from "react";
import * as FIELDS from "../../../../constants/fields";
import { displayRating } from "../../../../helpers";
import moment from "moment";
import * as ROUTES from "../../../../constants/routes";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaRegStar } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/all";

const ProjectCard = ({ project }) => {
	return (
		<>
			<td className="d-xl-flex justify-content-xl-center" id="cell">
				<div id="card_front">
					<div
						className="d-lg-flex justify-content-lg-center align-items-xl-start"
						id="card_image_div"
					>
						<LazyLoadImage
							className="img-fluid d-xl-flex"
							id="card_image"
							alt={"Project Background"}
							height={180}
							effect="blur"
							object-fit="cover"
							src={project[FIELDS.IMAGE_URL]}
						/>
					</div>
					<div
						style={{
							display: "flex",
							// border: "2px solid black",
							alignItems: "center",
							justifyContent: "center",
							height: "100px",
							padding: "0rem 0.5rem",
						}}
					>
						<h1
							className="d-sm-flex d-lg-flex"
							// id="card_front_title"
							style={{}}
						>
							{project[FIELDS.TITLE]}
							<br />
						</h1>
					</div>
					<p
						className="text-center d-lg-flex justify-content-lg-center"
						id="card_description"
					>
						{project[FIELDS.CARD_DESCRIPTION]}
						<br />
						<br />
					</p>
					<div
						className="d-sm-flex d-lg-flex justify-content-sm-center justify-content-lg-center align-items-xl-end"
						id="rating_div"
					>
						<div id="rating_stars">
							{displayRating(
								project[FIELDS.RATING],
								<FaRegStar />,
								"#F4D03F",
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
			</td>
		</>
	);
};

export default ProjectCard;
