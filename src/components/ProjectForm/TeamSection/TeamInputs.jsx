import React from "react";
import { Form, Col } from "react-bootstrap";

const TeamInputs = (props) => {
	return (
		<>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Control
						type="text"
						value={props.name}
						onChange={props.onNameChange}
						placeholder={props.namePlaceholder}
						maxLength={40}
						required
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Control
						type="text"
						placeholder={props.rolePlaceholder}
						value={props.role}
						onChange={props.onRoleChange}
						maxLength={20}
						required
					/>
				</Form.Group>
			</Form.Row>
		</>
	);
};

export default TeamInputs;
