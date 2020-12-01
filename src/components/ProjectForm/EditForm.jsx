import React from 'react';
import {Button, ButtonToolbar, Form, Alert} from "react-bootstrap";
import * as FIELDS from "../../constants/fields";

const EditForm = (props) => (
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
                              name={FIELDS.TITLE}
                              value={props.formState[FIELDS.TITLE]}
                              onChange={props.onChangeHandler}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your short project intro</Form.Label>
                <Form.Control as="textarea"
                              rows={5}
                              name={FIELDS.DESCRIPTION}
                              placeholder="Short Intro"
                              value={props.formState[FIELDS.DESCRIPTION]}
                              onChange={props.onChangeHandler}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                <Form.Label>Student Year</Form.Label>
                <Form.Control as="select" size="sm" custom
                              onChange={props.onChangeHandler}
                              name={FIELDS.YEAR}
                              value={props.formState[FIELDS.YEAR]}
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </Form.Control>
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
                              name={FIELDS.PROBLEM_DESCRIPTION}
                              value={props.formState[FIELDS.PROBLEM_DESCRIPTION]}
                              onChange={props.onChangeHandler}/>
                <br/>
                <Form.Control as="textarea"
                              rows={7}
                              placeholder="The theory details section!
Describes the theoretical parts of your project
Examples: Info about formulas, computations, statistics which u used at implementation "
                              name={FIELDS.THEORY_DESCRIPTION}
                              value={props.formState[FIELDS.THEORY_DESCRIPTION]}
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

export default EditForm;