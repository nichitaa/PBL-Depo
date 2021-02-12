import React from "react";

const Problem = ({ problemText }) => (
	<>
		<div className="row" id="project_page_row_3">
			<div
				className="col-xl-6 d-xl-flex justify-content-xl-end align-items-xl-center"
				id="project_page_col_2"
			>
				<div
					className="d-xl-flex justify-content-xl-center align-items-xl-center"
					id="project_title_row_2_text2"
				>
					<div
						className="d-xl-flex justify-content-xl-center align-items-xl-center"
						id="project_page_about_title"
					>
						<h1
							className="text-justify d-xl-flex justify-content-xl-center align-items-xl-center"
							id="problem_title"
						>
							Problem
						</h1>
					</div>
				</div>
			</div>
			<div
				className="col-xl-6 d-xl-flex justify-content-xl-start align-items-xl-center"
				id="project_page_col_2"
			>
				<div
					className="d-xl-flex align-items-xl-center"
					id="project_profile_image_div-2"
				>
					<p id="about_paragraph">
						{problemText}
						<br />
					</p>
				</div>
			</div>
		</div>
	</>
);

export default Problem;
