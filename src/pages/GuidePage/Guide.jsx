import React from "react";
import s from "./guide.module.css";

export default function Guide() {
	return (
		<>
			<section className={s.imageSection}>
				<img
					className={s.image}
					src="assets/img/pbl-depo-assets_guide.png"
					alt=""
				/>
			</section>
			<section className={s.titleSection}>
				<h1>About PBL</h1>
			</section>

			<section className={s.infoSection}>
				<div className={s.pblInfo}>
					<h3>What is PBL ?</h3>
					<p>
						If we are to look to the formal definition then PBL is a
						teaching method in which students are engaged in solving
						a real-world problem or answering a complex question.
						They demonstrate their knowledge and skills by creating
						a public product or presentation for a real audience. As
						a result, students develop deep content knowledge as
						well as critical thinking, collaboration, creativity and
						communication skills. In PBL, the project is what can be
						called - the vehicle for teaching the essential
						knowledge and skills students need to learn, in contrast
						to “traditional projects” PBL requires critical
						thinking, problem solving, various forms of
						communication and probably the most important aspect of
						all - collaboration
					</p>
				</div>
				<div className={s.startGuide}>
					<h3>How to start?</h3>
					<p>
						Any project requires a team and in PBL is no different.
						It does not matter whether the teams are pre-made or
						not, what matters is to communicate efficiently and be
						on the same page, here is where the adaptability comes
						into play. Since effective teamwork relies on
						communication, number two on the list should be
						brainstorming sessions and regular meetings. This is
						where your team identifies a problem, thinks of a
						solution, begins research and development steps; in
						other words this is where your project takes shape and
						gets a direction. Now, if we mentioned research and
						development, next comes self-directed learning (SDL).
						This is the calling-card for PBL, students choose on
						their own the learning path they want to pursue, so do
						not wait on getting any specific direction from your
						teachers & mentors, all they can do is point you into
						the right direction but their influence should be
						retained at a minimum. And lastly, and probably
						something that tends to get overlooked - deadlines. Yes,
						they are important, if you do not define proper
						deadlines you risk to get stalled and the progress on
						your project can be reduced to a halt very easily. To
						summarise - try to get on board with your team in order
						to establish clear deadlines in order register your
						progress and further develop your project efficiently.
					</p>
				</div>
			</section>

			<section className={s.infoSection}>
				<div className={s.whyGuide}>
					<h3>Why is PBL used in Higher Education?</h3>
					<p>
						Higher education institutions are using PBL because they
						are coming to realize that it works. One of the recent
						research studies published in Innovative Higher
						Education focused on life skill development of students
						enrolled in the Project Based Learning program, found
						that there appear a significant increase in eight
						different skills over the duration of 16-weeks of
						co-working of students on a project. Meaning that this
						educational program is one of the most efficient
						programmes used in Higher Education, as it focuses the
						student on development of such skills as:
						responsibility, time management, problem solving,
						self-directioning, collaboration, communication,
						creativity etc.
					</p>
				</div>
			</section>

			<section className={s.titleSection}>
				<h1>PBL Experience</h1>
			</section>

			<section className={s.infoSection}>
				<img
					className={s.imagefeedback}
					src="assets/img/turcanu.jpg"
					alt=""
				/>
				<div className={s.feedbackInfoR}>
					<h3>Ana Țurcanu</h3>
					<h5>Academic Group FAF-171</h5>
					<p>
						Initially, when I became acquainted with this new term,
						I understood that it would be a challenge, as I and my
						colleagues were accustomed until then to work
						individually, without too much collaboration and,
						sometimes, to be evaluated subjectively. However, due to
						the course of personal and professional development that
						was included in the curriculum in the first year of
						university, those who had problems regarding
						collaboration and teamwork began step by step to
						cultivate these skills, so that the semester project
						went beyond the common academic topics framework, being
						more exciting, interactive and very useful.
					</p>
				</div>
			</section>

			<section className={s.infoSection}>
				<div className={s.feedbackInfoL}>
					<h3>Radu Melnic</h3>
					<h5>CEGHID Director</h5>
					<p>
						I am proud to have had the opportunity to mentor
						students in the specialty "Software Engineering", FCIM,
						where the PBLMD program was implemented, and to enjoy
						their ingenuity to get involved in solving problems,
						according to the model Problem Based Learning. It was a
						challenge for me, as a teacher, but especially for them,
						as students, to learn to collaborate and work in a team,
						to identify and solve problems, to think laterally and
						analytically, from several perspectives, what they do.
					</p>
				</div>
				<img
					className={s.imagefeedback}
					src="assets/img/melnic.jpg"
					alt=""
				/>
			</section>
			<section className={s.infoSection}>
				<img
					className={s.imagefeedback}
					src="assets/img/plesca.jpg"
					alt=""
				/>
				<div className={s.feedbackInfoR}>
					<h3>Anișoara Ionela Pleșca</h3>
					<h5>Academic Group FAF-182</h5>
					<p>
						PBL teaches you not only the importance of teamwork, but
						the importance of the team itself. The right combination
						of skills and people makes all the difference between
						fun and weariness.
					</p>
				</div>
			</section>

			<section className={s.titleSection}>
				<h1>Topics</h1>
			</section>

			<section className={s.topicsSection}>
				<div className={s.topics}>
					<div className={s.topic}>
						<div className={s.card}>
							<div className={s.image}>
								<img
									className={s.imagefeedback}
									src="assets/img/pbl_year1.png"
									alt=""
								/>
							</div>
							<div className={s.details}>
								<h1>Semestrul I</h1>
								<p>CONCEPTUAL APP</p>
								<h1>Semestrul II</h1>
								<p>EQUIVALENT MODELS</p>
							</div>
						</div>
					</div>
					<div className={s.topic}>
						<div className={s.card}>
							<div className={s.image}>
								<img
									className={s.imagefeedback}
									src="assets/img/pbl_year2.png"
									alt=""
								/>
							</div>
							<div className={s.details}>
								<h1>Semestrul III</h1>
								<p>
									BASICS OF SOFTWARE APPLICATION DEVELOPEMENT
								</p>
								<h1>Semestrul IV</h1>
								<p>ELABORATION OF SPECIFIC DOMAIN LANGUAGES</p>
							</div>
						</div>
					</div>

					<div className={s.topic}>
						<div className={s.card}>
							<div className={s.image}>
								<img
									className={s.imagefeedback}
									src="assets/img/pbl_year3.png"
									alt=""
								/>
							</div>
							<div className={s.details}>
								<h1>Semestrul V</h1>
								<p>SECURE APPLICATION DEVELOPMENT</p>
								<h1>Semestrul VI</h1>
								<p>IOT</p>
							</div>
						</div>
					</div>

					<div className={s.topic}>
						<div className={s.card}>
							<div className={s.image}>
								<img
									className={s.imagefeedback}
									src="assets/img/pbl_year4.png"
									alt=""
								/>
							</div>
							<div className={s.details}>
								<h1>Semestrul VII</h1>
								<p>INFORMATIONAL SYSTEMS DEVELOPMENT</p>
								<h1>Semestrul VIII</h1>
								<p>BACHELOR'S DEGREE FINAL PROJECT</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className={s.titleSection}>
				<h1>Mentors</h1>
			</section>

			<section className={s.mentorsSection}>
				<nav>
					<div className="nav nav-tabs" id="nav-tab" role="tablist">
						<a
							className={`nav-item nav-link active ${s.mentorsNavLink}`}
							id="nav-home-tab"
							data-toggle="tab"
							href="#nav-home"
							role="tab"
							aria-controls="nav-home"
							aria-selected="true"
						>
							Who are the Mentors?
						</a>
						<a
							className={`nav-item nav-link ${s.mentorsNavLink}`}
							id="nav-profile1-tab"
							data-toggle="tab"
							href="#nav-profile1"
							role="tab"
							aria-controls="nav-profile1"
							aria-selected="false"
						>
							Alexandru Vdovicenco
						</a>
						<a
							className={`nav-item nav-link ${s.mentorsNavLink}`}
							id="nav-profile2-tab"
							data-toggle="tab"
							href="#nav-profile2"
							role="tab"
							aria-controls="nav-profile2"
							aria-selected="false"
						>
							Gabriel Zaharia
						</a>
						<a
							className={`nav-item nav-link ${s.mentorsNavLink}`}
							id="nav-profile3-tab"
							data-toggle="tab"
							href="#nav-profile3"
							role="tab"
							aria-controls="nav-profile3"
							aria-selected="false"
						>
							Vasile Drumea
						</a>
						<a
							className={`nav-item nav-link ${s.mentorsNavLink}`}
							id="nav-profile4-tab"
							data-toggle="tab"
							href="#nav-profile4"
							role="tab"
							aria-controls="nav-profile4"
							aria-selected="false"
						>
							Popa Dorin
						</a>
					</div>
				</nav>

				<div className={`tab-content`} id="nav-tabContent">
					<div
						className={`tab-pane fade show active ${s.tabContent}`}
						id="nav-home"
						role="tabpanel"
						aria-labelledby="nav-home-tab"
					>
						<div className={s.mentorsDetails}>
							<div className={s.mentorInfo}>
								A key aspect of successful PBL is mentoring
								throughout the entire process. Mentors are
								considered the pivot in the process of decision
								making of any PBL team and stay present with
								them every step of the way. Mentors play an
								essential role in providing real feedback, real
								input, monitoring progress and supporting the
								students. This insight from the mentors helps
								provide a unique perspective, unique insights
								which help students to move beyond the
								constraints of the classroom.
							</div>
						</div>
					</div>
					<div
						className={`tab-pane fade show ${s.tabContent}`}
						id="nav-profile1"
						role="tabpanel"
						aria-labelledby="nav-profile1-tab"
					>
						<div className={s.mentorsDetails}>
							<img
								className={s.imagementors}
								src="assets/img/alexandru_vdovicenco.png"
								alt=""
							/>
							<div className={s.mentorInfo}>
								<strong>Current Position: </strong>iOS
								Developer, Ellation Crunchyroll
								<br />
								<strong>Email: </strong>
								alexandr.vdovicenco@faf.utm.md
							</div>
							<div className={s.socialIcons}>
								<a
									className={s.iconLink}
									href="https://www.linkedin.com/in/alexandr-vdovicenco/"
								>
									<i
										className={`fab fa-linkedin fa-lg ${s.icon}`}
									></i>
								</a>

								<a
									className={s.iconLink}
									href="https://www.facebook.com/sasha.vd.9"
								>
									<i
										className={`fab fa-facebook-square fa-lg ${s.icon}`}
									></i>
								</a>

								<a
									className={s.iconLink}
									href="https://github.com/ASV44"
								>
									<i
										className={`fab fa-github-square fa-lg ${s.icon}`}
									></i>
								</a>
							</div>
						</div>
					</div>
					<div
						className={`tab-pane fade show ${s.tabContent}`}
						id="nav-profile2"
						role="tabpanel"
						aria-labelledby="nav-profile2-tab"
					>
						<div className={s.mentorsDetails}>
							<img
								className={s.imagementors}
								src="assets/img/zahariea.jpg"
								alt=""	
							/>
							<div className={s.mentorInfo}>
								<strong>Current Position: </strong>CEO, ITMIND
								<br />
								<strong>Email: </strong>
								gabriel.zaharia@faf.utm.md
							</div>
							<div className={s.socialIcons}>
								<a
									className={s.iconLink}
									href="https://www.linkedin.com/in/gabi-zaharia-412058181/"
								>
									<i
										className={`fab fa-linkedin fa-lg ${s.icon}`}
									></i>
								</a>

								<a
									className={s.iconLink}
									href="https://www.facebook.com/zaharia.gabi.98"
								>
									<i
										className={`fab fa-facebook-square fa-lg ${s.icon}`}
									></i>
								</a>
								<a
									className={s.iconLink}
									href="https://github.com/gzaharia"
								>
									<i
										className={`fab fa-github-square fa-lg ${s.icon}`}
									></i>
								</a>
							</div>
						</div>
					</div>
					<div
						className={`tab-pane fade show ${s.tabContent}`}
						id="nav-profile3"
						role="tabpanel"
						aria-labelledby="nav-profile3-tab"
					>
						<div className={s.mentorsDetails}>
							<img
								className={s.imagementors}
								src="assets/img/drumea_vasile.png"
								alt=""
							/>
							<div className={s.mentorInfo}>
								<strong>Current Position: </strong>Software
								Engineer, Urchin Systems
								<br />
								<strong>Email: </strong>vasile.drumea@faf.utm.md
							</div>
							<div className={s.socialIcons}>
								<a
									className={s.iconLink}
									href="https://www.linkedin.com/in/vasile-drumea-58019915b/"
								>
									<i
										className={`fab fa-linkedin fa-lg ${s.icon}`}
									></i>
								</a>

								<a
									className={s.iconLink}
									href="https://www.facebook.com/Dr.Vasile"
								>
									<i
										className={`fab fa-facebook-square fa-lg ${s.icon}`}
									></i>
								</a>
								<a
									className={s.iconLink}
									href="https://github.com/Wazea"
								>
									<i
										className={`fab fa-github-square fa-lg ${s.icon}`}
									></i>
								</a>
							</div>
						</div>
					</div>
					<div
						className={`tab-pane fade show ${s.tabContent}`}
						id="nav-profile4"
						role="tabpanel"
						aria-labelledby="nav-profile4-tab"
					>
						<div className={s.mentorsDetails}>
							<img
								className={s.imagementors}
								src="assets/img/popa_dorin.png"
								alt=""
							/>
							<div className={s.mentorInfo}>
								<strong>Current Position: </strong>React-Native
								Engineer, Ellation Crunchyroll
								<br />
								<strong>Email: </strong>dorin.popa@faf.utm.md
							</div>
							<div className={s.socialIcons}>
								<a
									className={s.iconLink}
									href="https://www.linkedin.com/in/dorinpopa/"
								>
									<i
										className={`fab fa-linkedin fa-lg ${s.icon}`}
									></i>
								</a>

								<a
									className={s.iconLink}
									href="https://www.facebook.com/Dorin95dp"
								>
									<i
										className={`fab fa-facebook-square fa-lg ${s.icon}`}
									></i>
								</a>
								<a
									className={s.iconLink}
									href="https://github.com/popadorin"
								>
									<i
										className={`fab fa-github-square fa-lg ${s.icon}`}
									></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
