import React, { useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Image,
} from "react-bootstrap";
import moment from 'moment';
import { BsStar } from "react-icons/bs";
import { useDB } from "../context/DBContext";
import { ProjectFeedbacks, FeedbackForm } from "../components";

// function to show the number of start on the page, depending on project rating
const getRating = (rating) => {
    const ratingStars = [];
    for (let i = 0; i < Math.round(rating); i++) {
        ratingStars.push(<React.Fragment key={i}><BsStar/>&nbsp;</React.Fragment>)
    }
    return ratingStars;
}

export default function ProjectPage({match}) {

    const projectId = match.params.id; // project ID

    const { getProjectById, projState, setProjState } = useDB(); // utils from our context

    // runs when projectId changes
    useEffect(() => {
        setProjState([]) // set the state back to empty
        console.log("useEffect on project id change🔥")
        getProjectById(projectId) // get the new project data, by new id
    }, [projectId])

    return (
        <>
            <h1 className="text-center">Project Profile Page</h1>
            <Container>
                <Row>
                    <Col>
                        <Image className="mw-100" src={projState.projectImageURL} key={projState.projectImageURL} rounded />
                    </Col>
                </Row>
            </Container>
            <h1 className="text-center">Project Name: {projState.projectName}</h1>
            <p><strong>Project Description:</strong> {projState.projectDescription}</p>
            <p><strong>Project Problem Description:</strong> {projState.projectProblemDescription}</p>
            <p><strong>Project Theory Description:</strong> {projState.projectTheoryDescription}</p>
            <p><strong>User Email:</strong> {projState.userEmail}</p>
            <p><strong>Project Rating:</strong>{getRating(projState.rating)}{projState.rating}</p>
            {
                projState.createdAt ?
                    <p><strong>Added:</strong> {moment(projState.createdAt.toDate()).calendar()} </p> :
                    <>No timestamp</>
            }

            <br/><br/>
            <ProjectFeedbacks />
            <FeedbackForm />
        </>
    )
}