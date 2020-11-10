import React from 'react';
import {useDB} from "../../context/DBContext";

const ProjectFeedbacks = () => {

    const { projFeedback } = useDB()

    return (
        <>
            <h2>Feedbacks</h2>
            {
                projFeedback.length > 0 ?
                    projFeedback.map((elem, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <p><strong>User: </strong>{elem.email}</p>
                                    <p><strong>Feedback: </strong>{elem.message}</p>
                                    <p><strong>Rating: </strong>{elem.rating}</p>
                                    <br/>
                                </React.Fragment>
                            )
                        }
                    ) :
                    <p>No Feedbacks</p>
            }
        </>
    );
}

export default ProjectFeedbacks;