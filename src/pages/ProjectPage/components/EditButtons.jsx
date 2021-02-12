import React from "react";
import { Button } from "react-bootstrap";
import history from "../../../constants/history";
import * as ROUTES from "../../../constants/routes";
import { useDB } from "../../../context/DBContext";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const EditButtons = ({ Id }) => {
	const { deleteProject } = useDB();

	const onEdit = () => {
		history.push(`${ROUTES.CATALOGUE}/${Id}/${ROUTES.EDIT}`);
	};
	const onDelete = async () => {
		if (window.confirm("Do you want to permanently delete this project")) {
			await deleteProject(Id);
			history.push(ROUTES.CATALOGUE);
		}
	};
	return (
		<>
			<Button variant="warning" onClick={onEdit}>
				Edit Project <AiFillEdit />
			</Button>{" "}
			&nbsp;
			<Button variant="danger" onClick={onDelete}>
				Delete Project <AiFillDelete />
			</Button>
		</>
	);
};

export default EditButtons;
