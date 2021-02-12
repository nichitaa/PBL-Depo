import React, { useRef } from "react";
import AnimatedNumber from "animated-number-react";
import useOnScreen from "../../../../hooks/useOnScree";
import { useDB } from "../../../../context/DBContext";

const Statistics = () => {
	const { stats } = useDB();
	const formatValue = (value) => `${Number(value).toFixed(0)}`;
	const duration = 2500;
	const ref = useRef();
	const isVisible = useOnScreen(ref);
	return (
		<>
			<section
				className="d-xl-flex justify-content-xl-center align-items-xl-center wrapper-numbers"
				id="section_statistics"
			>
				<div className="container">
					<div className="row countup text-center">
						<div className="col-md-8 offset-md-2 header-numbers">
							<h1 ref={ref}>Statistics</h1>
						</div>
						{isVisible && (
							<>
								<div className="col-sm-6 col-md-3 column">
									<p>
										<i
											className="icon-people"
											aria-hidden="true"
										/>
									</p>
									<p>
										<span className="count">
											<AnimatedNumber
												value={stats.users}
												formatValue={formatValue}
												duration={duration}
											/>
										</span>
									</p>
									<h2>Users registered</h2>
								</div>
								<div className="col-sm-6 col-md-3 column">
									<p>
										<i
											className="icon-cloud-upload"
											aria-hidden="true"
										/>
									</p>
									<p>
										<span className="count">
											<AnimatedNumber
												value={stats.projects}
												formatValue={formatValue}
												duration={duration}
											/>
										</span>
									</p>
									<h2>Projects uploaded</h2>
								</div>
								<div className="col-sm-6 col-md-3 column">
									<p>
										<i
											className="icon-user"
											aria-hidden="true"
										/>
									</p>
									<p>
										<span className="count">
											<AnimatedNumber
												value={4}
												formatValue={formatValue}
												duration={duration}
											/>
										</span>
									</p>
									<h2>Mentors</h2>
								</div>
								<div className="col-sm-6 col-md-3 column">
									<p>
										<i
											className="fas fa-cloud"
											aria-hidden="true"
										/>
									</p>
									<p>
										<span className="count">
											<AnimatedNumber
												value={20}
												formatValue={formatValue}
												duration={duration}
											/>
										</span>
									</p>
									<h2>Days storing pbl projects</h2>
								</div>
							</>
						)}
					</div>
				</div>
				<div />
			</section>
		</>
	);
};

export default Statistics;
