import React from "react";

const Solution = ({ solutionText }) => (
	<div className="row" id="project_page_row_4">
		<div
			className="col-xl-6 d-xl-flex justify-content-xl-end align-items-xl-center"
			id="project_page_col_2"
		>
			<div id="project_profile_image_div-3">
				<p id="about_paragraph">
					{solutionText}
					<br />
				</p>
			</div>
		</div>
		<div
			className="col-xl-6 d-xl-flex justify-content-xl-start align-items-xl-center"
			id="project_page_col_2"
		>
			<div
				className="d-xl-flex justify-content-xl-center align-items-xl-center"
				id="project_title_row_2_text3"
			>
				<div
					className="d-xl-flex justify-content-xl-center align-items-xl-center"
					id="project_page_about_title"
				>
					<h1
						className="text-justify d-xl-flex justify-content-xl-center align-items-xl-center"
						id="solution_title"
					>
						Our Solution
					</h1>
				</div>
			</div>
		</div>
	</div>
);

export default Solution;
