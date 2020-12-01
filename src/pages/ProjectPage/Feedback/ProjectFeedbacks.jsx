import React from 'react';
import * as FIELDS from "../../../constants/fields";

const ProjectFeedbacks = ({feedbacks}) => (
    <>
        <h2>Feedbacks</h2>
        {
            feedbacks.length > 0 ?
                feedbacks.map((feedback, idx) =>
                    (
                        <React.Fragment key={idx}>
                            <p><strong>User: </strong>{feedback[FIELDS.FEEDBACK_EMAIL]}</p>
                            <p><strong>Feedback message: </strong>{feedback[FIELDS.FEEDBACK_MESSAGE]}</p>
                            <p><strong>Rating: </strong>{feedback[FIELDS.FEEDBACK_RATING]}</p>
                            <br/>
                        </React.Fragment>
                    )
                ) :
                <p>No Feedbacks</p>
        }
    </>
)

export default ProjectFeedbacks;