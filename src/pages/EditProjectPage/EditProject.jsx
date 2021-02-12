import React, { useEffect, useState } from "react";
import { useDB } from "../../context/DBContext";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../../components";
import EditFormContainer from "./container/EditFormContainer";
import history from "../../constants/history";
import * as ROUTES from "../../constants/routes";

const EditProject = ({ match }) => {
	const [editPermission, setEditPermission] = useState(false);
	const { isUserProject } = useDB();
	const { currentUser: user } = useAuth();
	const projectID = match.params.id;

	useEffect(() => {
		const getEditPermission = async () => {
			return await isUserProject(projectID);
		};
		if (user) {
			getEditPermission().then((response) => {
				console.log("Edit Permission for this user: ", response);
				if (response) {
					// setTimeout(() => {
					setEditPermission(true);
					// }, 1000)
				} else {
					alert("You are not allowed to modify this project!");
					history.push(`${ROUTES.CATALOGUE}`);
					// window.location.reload(false)
				}
			});
		} else {
			if (window.confirm("Please Sing In first!")) {
				history.push(ROUTES.LOG_IN);
			} else {
				history.push(ROUTES.CATALOGUE);
			}
			// window.location.reload(false);
		}
		// eslint-disable-next-line
	}, [projectID]);

	if (!editPermission) {
		return <Loading />;
	}
	return (
		<>
			<EditFormContainer projectID={projectID} />
		</>
	);
};

export default EditProject;
