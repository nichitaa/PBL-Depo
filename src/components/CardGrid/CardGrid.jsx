import React, { useCallback } from "react";
import { OneCard, Pagination } from "../../components";
import { useDB } from "../../context/DBContext";
import * as FIELDS from "../../constants/fields";

const CardGrid = React.memo(({ projects }) => {
	const { currentPage, setCurrentPage, projectsPerPage } = useDB();

	// get current projects
	const idxOfLastProject = currentPage * projectsPerPage;
	const idxOfFirstProject = idxOfLastProject - projectsPerPage;
	const currentProjects = projects.slice(idxOfFirstProject, idxOfLastProject);

	const paginate = useCallback(
		(pageNumber) => setCurrentPage(pageNumber),
		// eslint-disable-next-line
		[]
	);

	return (
		<>
			<div className="container">
				<div className="row" id="catalogue_row">
					{currentProjects.map((project, idx) => (
						<div className="col-md-3" key={project[FIELDS.ID]}>
							<OneCard project={project} />
						</div>
					))}
				</div>
				<Pagination
					projectsPerPage={projectsPerPage}
					numberOfProjects={projects.length}
					paginate={paginate}
				/>
			</div>
		</>
	);
});

export default CardGrid;
