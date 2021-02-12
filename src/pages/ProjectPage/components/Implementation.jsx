import React from "react";

const Implementation = ({ implementationText }) => (
	<div
		className="d-xl-flex justify-content-xl-center align-items-xl-center"
		id="concept_div"
	>
		<div id="concept_design">
			<div
				className="d-xl-flex justify-content-xl-center align-items-xl-center"
				id="concept_title"
			>
				<h1 id="concept_title_text">Concept implementation</h1>
			</div>
			<div
				className="d-xl-flex justify-content-xl-center align-items-xl-start"
				id="concept_text_div"
			>
				<p
					className="d-xl-flex justify-content-xl-center align-items-xl-center"
					id="concept_text"
				>
					{implementationText}
					<br />
				</p>
			</div>
		</div>
	</div>
);

export default Implementation;
