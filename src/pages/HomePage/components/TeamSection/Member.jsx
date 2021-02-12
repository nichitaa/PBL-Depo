import React from "react";

const Member = (props) => {
	return (
		<>
			<div className="col-md-4 col-lg-3 item" id="team_column">
				<div id={props.id} className="box">
					<div className="cover">
						<h3 className="name">{props.name}</h3>
						<p className="title">{props.role}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Member;
