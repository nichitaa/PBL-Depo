import React from 'react';
import {Form} from "react-bootstrap";

const Input = (props) => {
    const validInput = () => (
        <Form.Control.Feedback type="valid"> Looks Good! </Form.Control.Feedback>
    );
    const invalidInput = () => (
        <Form.Control.Feedback type="invalid"> This field can not be empty! </Form.Control.Feedback>
    );

    return (
        <Form.Group>
            {
                props.label &&
                <Form.Label
                // style={{color: "#F9484A"}}
                    >
                    {props.label}
                </Form.Label>
            }
            <Form.Control as="textarea"
                          rows={props.rows}
                          maxLength={props.maxLength}
                          placeholder={props.placeholder}
                          style={{resize: "none"}}
                          name={props.name}
                          value={props.value}
                          onChange={props.onChange}
                          required/>
            {validInput()}
            {invalidInput()}
        </Form.Group>
    )
}

export default Input;