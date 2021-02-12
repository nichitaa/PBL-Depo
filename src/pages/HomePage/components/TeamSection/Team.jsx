import React from "react";
import Member from "./Member";

const Team = () => {
	return (
		<>
			<div id="team" className="team-grid">
				<div className="container">
					<div className="d-lg-flex justify-content-lg-center align-items-lg-center">
						<div id="team_intro" className="intro">
							<h2
								className="text-center d-lg-flex justify-content-lg-center"
								data-aos="fade-down"
								data-aos-duration="800"
								data-aos-once="true"
								id="our_team"
							>
								Our Team
							</h2>
						</div>
					</div>
					<div
						className="row d-flex d-lg-flex justify-content-center justify-content-lg-center people"
						data-aos="fade-down"
						data-aos-duration="800"
						data-aos-delay="300"
						data-aos-once="true"
					>
						<Member
							id="costea"
							name="Costel Cazacu"
							role="Product Designer"
						/>
						<Member
							id="sandu"
							name="Sandu Furdui"
							role="Web Designer"
						/>
						<Member
							id="antonela"
							name="Antonela Malîi"
							role="Designer"
						/>
					</div>
					<div
						className="row d-flex d-lg-flex justify-content-center justify-content-lg-center people"
						data-aos="fade-down"
						data-aos-duration="800"
						data-aos-delay="600"
						data-aos-once="true"
					>
						<Member
							id="nichita"
							name="Nichita Pasecinic"
							role="Back-end developer"
						/>
						{/*<Member id="wasea" name="Vasile Drumea" role="Bmentor"/>*/}
						{/*<Member id="pizdabol" name="Alexandru Danilescu" role="Researcher"/>*/}
					</div>
				</div>
			</div>
		</>
	);
};

export default Team;
