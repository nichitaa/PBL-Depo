import React from 'react';
import {Button, ButtonToolbar, Form, Alert} from "react-bootstrap";

const EditForm = (props) => {
    return (
        <div className="row justify-content-center">
            <Form onSubmit={props.onFormSubmit} className="col-md-6 col-md-offset-4">
                <Form.Label>
                    <h1>Update Form</h1>
                </Form.Label>
                <Form.Group>
                    <Form.Label>
                        <h4>Short Overview</h4>
                    </Form.Label><br/>
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control placeholder="enter project name or team name"
                                  name="projectName"
                                  value={props.formState.projectName}
                                  onChange={props.onChangeHandler}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Your short project intro</Form.Label>
                    <Form.Control as="textarea"
                                  rows={5}
                                  name="projectDescription"
                                  placeholder="Short Intro"
                                  value={props.formState.projectDescription}
                                  onChange={props.onChangeHandler}/>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>
                        <h4>Project Details</h4>
                    </Form.Label>
                    <Form.Control as="textarea"
                                  rows={5}
                                  placeholder="Problem Description!
What problem is suppose to solve your project idea ? "
                                  name="projectProblemDescription"
                                  value={props.formState.projectProblemDescription}
                                  onChange={props.onChangeHandler}/>
                    <br/>
                    <Form.Control as="textarea"
                                  rows={7}
                                  placeholder="The theory details section!
Describes the theoretical parts of your project
Examples: Info about formulas, computations, statistics which u used at implementation "
                                  name="projectTheoryDescription"
                                  value={props.formState.projectTheoryDescription}
                                  onChange={props.onChangeHandler}/>
                    <br/>
                </Form.Group>
                <Alert variant="danger">
                    IMPORTANT!!! Please ReUpload this Files
                </Alert>
                <Form.File type="file"
                           id="custom-file"
                           label="Upload a background image for your PBL project page"
                           custom
                           onChange={props.onImageChange}/>
                <br/><br/>
                <Form.File type="file"
                           id="custom-file"
                           label="Upload the FULL pdf report of your PBL project"
                           custom
                           onChange={props.onPdfReportChange}/>
                <br/><br/>
                <ButtonToolbar className="justify-content-between"
                               aria-label="Toolbar with Button groups">
                    <Button type="submit"
                            variant="outline-success"
                            disabled={props.loading}>
                        Update Project Form
                    </Button>
                </ButtonToolbar>
            </Form>
        </div>
    )
}
export default EditForm;