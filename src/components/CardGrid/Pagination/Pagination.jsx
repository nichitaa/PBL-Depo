import React, { useEffect } from "react";

const Pagination = ({ projectsPerPage, numberOfProjects, paginate }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(numberOfProjects / projectsPerPage); i++) {
		pageNumbers.push(i);
	}

	// for example we are on page 2, and search for a project
	// and fuse.js search will return 1 project, then obviously
	// we need to paginate to the first page as the searched project will be there.
	// this why we need to trigger this useEffect when the number of projects changes
	useEffect(() => {
		if (numberOfProjects <= projectsPerPage) {
			paginate(1);
		}
	}, [numberOfProjects, paginate, projectsPerPage]);

	return (
		<div
			className="d-md-flex d-xl-flex justify-content-md-center justify-content-xl-center"
			id="page_number"
		>
			<ul className="pagination">
				{pageNumbers.map((pageNum) => (
					<li className="page-item" key={pageNum}>
						<button
							onClick={() => paginate(pageNum)}
							className="btn btn-primary"
							id="page_no"
							type="button"
						>
							{pageNum}
						</button>
					</li>
				))}
			</ul>
		</div>
		// <div className="row align-items-center justify-content-center">
		//     <ul className="pagination">
		//         {pageNumbers.map(pageNum => (
		//             <li className="page-item" key={pageNum}>
		//                 <button onClick={() => paginate(pageNum)} className="page-link"> {pageNum} </button>
		//             </li>
		//         ))}
		//     </ul>
		// </div>
	);
};

export default Pagination;
