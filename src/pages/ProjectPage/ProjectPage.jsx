import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import moment from 'moment';
import {useDB} from "../../context/DBContext";
import {useAuth} from "../../context/AuthContext";
import Loading from "../../components/LoadingSpiner/Loading";
import * as ROUTES from "../../constants/routes";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {FaRegFilePdf} from "react-icons/fa";
import {BsImageFill} from "react-icons/bs";
import {getRating} from "../../helpers";
import ProjectFeedbacks from "./Feedback/ProjectFeedbacks";
import FeedbackForm from "./Feedback/FeedbackForm";


export default function ProjectPage({match}) {

    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false);

    const {
        getProjectById,
        projState: project,
        setProjState,
        isUserProject,
        deleteProject,
        projFeedback: feedbacks,
    } = useDB(); // from context
    const { currentUser: user } = useAuth();

    const history = useHistory();
    const projId = match.params.id; // project ID

    const onEdit = () => {
        if (edit) {
            history.push({
                pathname: `${ROUTES.CATALOGUE}/${project.projectId}/${ROUTES.EDIT}`,
            })
        }
    }
    const onDelete = async () => {
        if (window.confirm('Do you want to permanently delete this project')) {
            await deleteProject(projId)
            history.push(ROUTES.CATALOGUE)
        }
    }
    // runs when projId changes
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setProjState([]) // set the state back to empty
            console.log("useEffect on project id change🔥")
            getProjectById(projId) // get the new project data, by new id
            if (user) {
                // async function to get the promise from isUserProject
                const getEditPermission = async () => {
                    return await isUserProject(projId) // true / false
                }
                // call async func
                getEditPermission().then((response) => {
                    console.log('Edit permission response: ', response)
                    setEdit(response) // set edit permissions to the response from async func
                })
            }
            setLoading(false);
        }, 1000)
    }, [projId])

    return (
        <>
            {
                loading ?
                    <Loading/>
                    :
                    <>
                        <h1 className="text-center">Project Profile Page</h1>
                        <Container>
                            <Row className="row justify-content-center">
                                <Col className="col-md-5 ">
                                    <img className="mw-100" src={project.projectImageURL}/>
                                    {/*<Image className="mw-100" src={projState.projectImageURL}*/}
                                    {/*       key={projState.projectImageURL}*/}
                                    {/*       rounded/>*/}
                                </Col>
                            </Row>
                        </Container>
                        <h1 className="text-center">Project Name: {project.projectName}</h1>
                        <p><strong>Project Description:</strong> {project.projectDescription}</p>
                        <p><strong>Project Problem Description:</strong> {project.projectProblemDescription}</p>
                        <p><strong>Project Theory Description:</strong> {project.projectTheoryDescription}</p>
                        <p><strong>User Email:</strong> {project.userEmail}</p>
                        <p><strong>Project Rating:</strong>{getRating(project.rating)}{project.rating}</p>
                        { project.createdAt && <p><strong>Added:</strong> {moment(project.createdAt.toDate()).calendar()} </p> }
                        <p><strong>Attachments: </strong>
                            <Button variant="outline-info">
                            <FaRegFilePdf size="1.5rem"
                                          onClick={() => window.open(project.projectReportURL)}/>
                        </Button> &nbsp;
                        <Button variant="outline-info">
                            <BsImageFill size="1.5rem"
                                         onClick={() => window.open(project.projectImageURL)}/>
                        </Button>
                        </p>
                        {
                            edit &&
                            <>
                                <Button variant="outline-warning" onClick={onEdit}
                                >Edit Project</Button> &nbsp;
                                <Button variant="outline-danger" onClick={onDelete}
                                >Delete Project</Button>
                            </>
                        }
                        <hr/>
                        <br/>
                        <ProjectFeedbacks feedbacks={feedbacks}/>
                        <FeedbackForm/>
                    </>
            }
        </>
    )

}
