import React from "react";
import { Form } from "react-bootstrap";

const SelectInput = (props) => {
	return (
		<Form.Group>
			<Form.Label>{props.label}</Form.Label>
			<Form.Control
				as="select"
				size="sm"
				custom
				onChange={props.onChange}
				name={props.name}
				value={props.value}
			>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
			</Form.Control>
			<br />
		</Form.Group>
	);
};

export default SelectInput;
