import React from 'react';

const ProjectFeedbacks = ({feedbacks}) => (
    <>
        <h2>Feedbacks</h2>
        {
            feedbacks.length > 0 ?
                feedbacks.map((feedback, idx) =>
                    (
                        <React.Fragment key={idx}>
                            <p><strong>User: </strong>{feedback.email}</p>
                            <p><strong>Feedback message: </strong>{feedback.message}</p>
                            <p><strong>Rating: </strong>{feedback.rating}</p>
                            <br/>
                        </React.Fragment>
                    )
                ) :
                <p>No Feedbacks</p>
        }
    </>
)

export default ProjectFeedbacks;