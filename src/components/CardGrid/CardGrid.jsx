import React from 'react';
import OneCard from "./OneCard";

const CardGrid = ({projects}) => (
    <>
        <div className="row row-cols-1 row-cols-md-4" style={{marginLeft: "30px"}}>
            {projects.map((project, idx) =>
                <div className="col mb-4" key={project.projectId}>
                    <OneCard project={project}/>
                </div>
            )}
        </div>
    </>
)

export default CardGrid;