import React, { useState } from "react";
import AnimatedNumber from "animated-number-react";
import { useDB } from "../../context/DBContext";

const LiveStats = () => {
	const { stats } = useDB();
	const formatValue = (value) => `${Number(value).toFixed(0)}`;
	const duration = 1000;
	const [show, setShow] = useState(false);
	return (
		<div>
			<strong
				onMouseOver={() => setShow(true)}
				onMouseOut={() => setShow(false)}
			>
				Show Live Stats on Hover
			</strong>
			{show && (
				<>
					<h3>
						Total Projects: &nbsp; &nbsp;
						<AnimatedNumber
							value={stats.projects}
							formatValue={formatValue}
							duration={duration}
						/>
					</h3>
					<h3>
						Total Active Users: &nbsp; &nbsp;
						<AnimatedNumber
							value={stats.users}
							formatValue={formatValue}
							duration={duration}
						/>
					</h3>
				</>
			)}
		</div>
	);
};

export default LiveStats;
