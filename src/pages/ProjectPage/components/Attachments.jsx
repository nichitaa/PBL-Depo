import React from "react";
import { Button } from "react-bootstrap";
import { FaRegFilePdf } from "react-icons/fa";
import { BsImageFill } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";

const Attachments = ({ reportURL, imageURL, githubURL }) => {
	return (
		<>
			<div
				className="d-xl-flex justify-content-xl-center"
				id="view_report_div"
			>
				<Button variant="info" onClick={() => window.open(reportURL)}>
					PDF Report &nbsp;
					<FaRegFilePdf size="1.5rem" />
				</Button>{" "}
				&nbsp;
				<Button variant="info" onClick={() => window.open(imageURL)}>
					BG image &nbsp;
					<BsImageFill size="1.5rem" />
				</Button>{" "}
				&nbsp;
				<Button variant="info" onClick={() => window.open(githubURL)}>
					GitHub Project &nbsp;
					<AiFillGithub size="1.5rem" />
				</Button>
			</div>
		</>
	);
};

export default Attachments;
