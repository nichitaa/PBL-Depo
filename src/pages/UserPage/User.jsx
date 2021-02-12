import React, { useEffect, useState } from "react";
import { useDB } from "../../context/DBContext";
import { CardGrid, Loading } from "../../components";
import { CgLockUnlock } from "react-icons/cg";

let flag = true; // show loading spinner only once at user session

export default function User() {
	const [loading, setLoading] = useState(true);
	const { userProjects: projects, setCurrentPage } = useDB();

	useEffect(() => {
		if (flag === true) {
			setLoading(true);
			setCurrentPage(1); // set users projects pagination back to first page
			setTimeout(() => {
				setLoading(false);
				flag = false;
			}, 1000);
		} else if (flag === false) {
			setLoading(false);
		}
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<div
				className="d-flex justify-content-center"
				data-aos="fade-up"
				data-aos-duration="500"
			>
				<h1
					style={{
						fontFamily: "Montserrat",
						letterSpacing: "5px",
						color: "rgba(255,255,255,0.5)",
						border: "4px solid rgba(255,255,255,0.5)",
						width: "74%",
						alignSelf: "center",
						textAlign: "center",
						borderRadius: "20px",
						padding: "5px",
						boxShadow: "5px 5px 5px rgba(0,0,0,0.3)",
					}}
				>
					My PBL Projects
					<CgLockUnlock
						style={{
							marginBottom: "10px",
							marginLeft: "10px",
						}}
						color="rgba(255,255,255,0.5)"
						size="3rem"
					/>
				</h1>
			</div>
			{projects ? (
				<div
					data-aos="fade-up"
					data-aos-duration="500"
					data-aos-delay="100"
				>
					<CardGrid projects={projects} />
				</div>
			) : (
				<p>U dont have any projects yet</p>
			)}
		</>
	);
}
