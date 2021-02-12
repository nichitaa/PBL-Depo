import React from "react";
import * as FIELDS from "../../../../constants/fields";
import ProjectCard from "./ProjectCard";
import { Loading } from "../../../../components";
import { useDB } from "../../../../context/DBContext";

const Grid = () => {
	const { recentProjects: projects } = useDB();
	return (
		<>
			<div
				className="table-responsive"
				data-aos="fade-down"
				data-aos-duration="800"
				data-aos-once="true"
			>
				<table className="table">
					<tbody>
						<tr
							className="d-xl-flex justify-content-xl-center align-items-xl-center"
							id="index_table_row"
						>
							{projects ? (
								projects.map((project) => {
									return (
										<ProjectCard
											project={project}
											key={project[FIELDS.ID]}
										/>
									);
								})
							) : (
								<Loading />
							)}
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Grid;
