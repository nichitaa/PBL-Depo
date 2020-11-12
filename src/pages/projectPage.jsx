import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import moment from 'moment';
import {BsStar} from "react-icons/bs";
import {useDB} from "../context/DBContext";
import {FeedbackForm, ProjectFeedbacks} from "../components";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import * as ROUTES from "../constants/routes";
import {SolarSystemLoading} from 'react-loadingg';
import {useAuth} from "../context/AuthContext";

const LoadingComponent = () => {
    return <div><SolarSystemLoading color="#751fab" site="large"/></div>
}

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
    const {getProjectById, projState, setProjState, isUserProject, DeleteProject} = useDB(); // utils from our context
    const {currentUser} = useAuth();
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const editProject = () => {
        if (edit) {
            history.push({
                pathname: `${ROUTES.CATALOGUE}/${projState.projectId}/${ROUTES.EDIT}`,
            })
        }
    }
    const deleteProject = async () => {
        if (window.confirm('Do you want to permanently delete this project')) {
            await DeleteProject(projectId)
            history.push(ROUTES.CATALOGUE)
        }
        ;
    }

    // runs when projectId changes
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setProjState([]) // set the state back to empty
            console.log("useEffect on project id change🔥")
            getProjectById(projectId) // get the new project data, by new id
            if (currentUser) {
                // async function to get the promise from isUserProject
                const getEditPermission = async () => {
                    return await isUserProject(projectId) // true / false
                }
                // call async func
                getEditPermission().then((response) => {
                    console.log('response', response)
                    setEdit(response) // set edit permissions to the response from asnync func
                })
            }
            setLoading(false);
        }, 1500)
    }, [projectId])

    return (
        <>
            {
                loading ?
                    <LoadingComponent/>
                    :
                    <>
                        <h1 className="text-center">Project Profile Page</h1>
                        <Container>
                            <Row>
                                <Col>
                                    <Image className="mw-100" src={projState.projectImageURL}
                                           key={projState.projectImageURL}
                                           rounded/>
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
                                <p>No timestamp</p>
                        }

                        {
                            edit ?
                                (
                                    <>
                                        <Button variant="outline-warning" onClick={editProject}
                                        >Edit Project</Button>
                                        <Button variant="outline-danger" onClick={deleteProject}
                                        >Delete Project</Button>
                                    </>
                                ) :
                                <p>No edit permissions</p>
                        }

                        <br/><br/>
                        <ProjectFeedbacks/>
                        <FeedbackForm/>
                    </>
            }
        </>
    )

}
