import React from "react";
import NewProjectFormContainer from "./container/NewProjectFormContainer";
import { useAuth } from "../../context/AuthContext";
import history from "../../constants/history";
import * as ROUTES from "../../constants/routes";
import { Loading } from "../../components";

const NewProjectForm = () => {
	const { currentUser } = useAuth();

	// user is not logged in
	if (!currentUser) {
		alert("Please LogIn/SignUp to be able to submit new project!");
		history.push(`${ROUTES.LOG_IN}`);
	}

	// user is not verified
	else if (currentUser && !currentUser.emailVerified) {
		alert("Please Verify your email to continue!");
		history.push(`${ROUTES.VERIFY_EMAIL}`);
	}

	return <>{!currentUser ? <Loading /> : <NewProjectFormContainer />}</>;
};

export default NewProjectForm;
