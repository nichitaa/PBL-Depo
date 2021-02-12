import React from "react";
import Grid from "./Grid";

const RecentProjects = () => {
	return (
		<>
			<div id="scroll4">
				<div className="container">
					<div className="intro">
						<h2
							className="text-center"
							data-aos="fade-down"
							data-aos-duration="800"
							data-aos-once="true"
							id="scroll4_title"
						>
							Recent Projects
						</h2>
						<p
							className="text-center"
							data-aos="fade-down"
							data-aos-duration="800"
							data-aos-delay="200"
							data-aos-once="true"
						>
							Upload your project and it will be displayed first
							down below
						</p>
						<div className="d-sm-flex justify-content-sm-center" />
					</div>
				</div>
				<Grid />
			</div>
		</>
	);
};

export default RecentProjects;
