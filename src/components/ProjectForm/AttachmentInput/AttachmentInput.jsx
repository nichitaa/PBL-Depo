import React from "react";
import { Form } from "react-bootstrap";

const AttachmentInput = (props) => {
	return (
		<Form.Group>
			<Form.File custom>
				<Form.File.Input
					required
					accept={props.accept}
					onChange={props.onChange}
				/>
				<Form.File.Label data-browse={props.buttonText}>
					{props.label}
				</Form.File.Label>
				<Form.Control.Feedback type="valid">
					{props.validMessage}
				</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					{props.invalidMessage}
				</Form.Control.Feedback>
			</Form.File>
		</Form.Group>
	);
};

export default AttachmentInput;
