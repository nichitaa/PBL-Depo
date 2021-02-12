import React from "react";

const Team = ({ teamMembers }) => {
	return (
		<div
			className="d-xl-flex justify-content-xl-center align-items-xl-center"
			id="concept_div"
		>
			<div id="team_members_design">
				<div
					className="d-xl-flex justify-content-xl-center align-items-xl-center"
					id="team_box_title"
				>
					<h1 id="team_title">Team members</h1>
				</div>
				<div
					className="d-xl-flex justify-content-xl-center align-items-xl-center"
					id="team_text"
				>
					{teamMembers[0] ? (
						teamMembers.map((cel, idx) => (
							<p id="team_member_name" key={idx}>
								{cel.name}
							</p>
						))
					) : (
						<p>Loading team members</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Team;
