import React from 'react';
import {OneCard} from "../../components";
import * as FIELDS from "../../constants/fields";

const CardGrid = ({projects}) => (
    <>
        <div className="row row-cols-1 row-cols-md-4" style={{marginLeft: "30px"}}>
            {projects.map((project, idx) =>
                <div className="col mb-4" key={project[FIELDS.ID]}>
                    <OneCard project={project}/>
                </div>
            )}
        </div>
    </>
)

export default CardGrid;