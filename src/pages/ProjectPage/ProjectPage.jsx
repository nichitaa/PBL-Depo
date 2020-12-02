import React, {useEffect, useState} from 'react';
import history from "../../constants/history";
import moment from 'moment';
import {useDB} from "../../context/DBContext";
import {useAuth} from "../../context/AuthContext";
import {Loading} from "../../components";
import {getRating} from "../../helpers";
import {Button, Col, Container, Row} from "react-bootstrap";
import {FaRegFilePdf} from "react-icons/fa";
import {BsImageFill} from "react-icons/bs";
import ProjectFeedbacks from "./Feedback/ProjectFeedbacks";
import FeedbackForm from "./Feedback/FeedbackForm";
import * as ROUTES from "../../constants/routes";
import * as FIELDS from "../../constants/fields";


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
    const {currentUser: user} = useAuth();

    const projectId = match.params.id; // project ID

    const onEdit = () => {
        if (edit) {
            history.push(`${ROUTES.CATALOGUE}/${project[FIELDS.ID]}/${ROUTES.EDIT}`)
        }
    }
    const onDelete = async () => {
        if (window.confirm('Do you want to permanently delete this project')) {
            await deleteProject(projectId)
            history.push(ROUTES.CATALOGUE)
        }
    }
    // runs when projectId changes
    useEffect(() => {
        setLoading(true);
        setProjState([]) // set the state back to empty
        console.log("useEffect on project id change🔥")
        getProjectById(projectId) // get the new project data, by new id
        if (user) {
            // async function to get the promise from isUserProject
            const getEditPermission = async () => {
                return await isUserProject(projectId) // true / false
            }
            // call async func
            getEditPermission().then((response) => {
                console.log('Edit permission response: ', response)
                setEdit(response) // set edit permissions to the response from async func
            })
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000)
        // eslint-disable-next-line
    }, [projectId])

    if(!project){
        history.push(ROUTES.PAGE_NOT_FOUND);
        window.location.reload(false);
        return;
    }

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
                                    <img className="mw-100" src={project[FIELDS.IMAGE_URL]} alt="Project background"/>
                                    {/*<Image className="mw-100" src={projState.projectImageURL}*/}
                                    {/*       key={projState.projectImageURL}*/}
                                    {/*       rounded/>*/}
                                </Col>
                            </Row>
                        </Container>
                        <h1 className="text-center">Project Name: {project[FIELDS.TITLE]}</h1>
                        <p><strong>Project Description:</strong> {project[FIELDS.DESCRIPTION]}</p>
                        <p><strong>Project Problem Description:</strong> {project[FIELDS.PROBLEM_DESCRIPTION]}</p>
                        <p><strong>Project Theory Description:</strong> {project[FIELDS.THEORY_DESCRIPTION]}</p>
                        <p><strong>User Email:</strong> {project[FIELDS.USER_EMAIL]}</p>
                        <p><strong>Project Rating:</strong>{getRating(project[FIELDS.RATING])}{project[FIELDS.RATING]}</p>
                        {project[FIELDS.CREATED_AT] &&
                        <p><strong>Added:</strong> {moment(project[FIELDS.CREATED_AT].toDate()).calendar()} </p>}
                        <p><strong>Attachments: </strong>
                            <Button variant="outline-info">
                                <FaRegFilePdf size="1.5rem"
                                              onClick={() => window.open(project[FIELDS.REPORT_URL])}/>
                            </Button> &nbsp;
                            <Button variant="outline-info">
                                <BsImageFill size="1.5rem"
                                             onClick={() => window.open(project[FIELDS.IMAGE_URL])}/>
                            </Button>
                        </p>
                        {
                            edit &&
                            <>
                                <Button variant="outline-warning" onClick={onEdit}>
                                    Edit Project
                                </Button> &nbsp;
                                <Button variant="outline-danger" onClick={onDelete}>
                                    Delete Project
                                </Button>
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
