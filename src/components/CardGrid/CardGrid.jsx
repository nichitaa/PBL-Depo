import React, {useCallback, useState} from 'react';
import {OneCard, Pagination} from "../../components";
import * as FIELDS from "../../constants/fields";


const CardGrid = React.memo(({projects}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(2);

    // get current post
    const idxOfLastProject = currentPage * projectsPerPage;
    const idxOfFirstProject = idxOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(idxOfFirstProject, idxOfLastProject);

    const paginate = useCallback( (pageNumber) => setCurrentPage(pageNumber), [])

    return (
        <>
            <div className="row row-cols-1 row-cols-md-4" style={{marginLeft: "30px"}}>
                {currentProjects.map((project, idx) =>
                    <div className="col mb-4" key={project[FIELDS.ID]}>
                        <OneCard project={project}/>
                    </div>
                )}
            </div>
            <Pagination projectsPerPage={projectsPerPage} numberOfProjects={projects.length} paginate={paginate}/>
        </>
    )
})

export default CardGrid;