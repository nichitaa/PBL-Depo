import React, { useEffect, useState } from "react";
import history from "../../constants/history";
import { useDB } from "../../context/DBContext";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../../components";
import * as ROUTES from "../../constants/routes";
import * as FIELDS from "../../constants/fields";
import {
	FeedbackForm,
	ProjectFeedbacks,
	Title,
	Attachments,
	MentorReview,
	Team,
	Implementation,
	Solution,
	Problem,
	About,
	EditButtons,
} from "./components";

export default function ProjectPage({ match }) {
	const [edit, setEdit] = useState(false);
	const [loading, setLoading] = useState(true);

	const {
		getProjectById,
		projState: project,
		setProjState,
		isUserProject,
		projFeedback: feedbacks,
	} = useDB(); // from context
	const { currentUser: user } = useAuth();

	const projectId = match.params.id; // project ID

	// runs when projectId changes
	useEffect(() => {
		window.scrollTo(0, 0); // scroll to top when component mounts
		setLoading(true);
		setProjState([]); // set the state back to empty
		console.log("useEffect on project id change🔥");
		getProjectById(projectId); // get the new project data, by new id
		if (user) {
			// async function to get the promise from isUserProject
			const getEditPermission = async () => {
				return await isUserProject(projectId); // true / false
			};
			// call async func
			getEditPermission().then((response) => {
				console.log("Edit permission response: ", response);
				setEdit(response); // set edit permissions to the response from async func
			});
		}
		setTimeout(() => {
			setLoading(false);
		}, 500);
		// eslint-disable-next-line
	}, [projectId]);

	if (!project) {
		history.push(ROUTES.PAGE_NOT_FOUND);
		window.location.reload(false);
	}

	if (loading) {
		return <Loading />;
	}
	return (
		<>
			<Title
				title={project[FIELDS.TITLE]}
				imageURL={project[FIELDS.IMAGE_URL]}
				rating={project[FIELDS.RATING]}
				userEmail={project[FIELDS.USER_EMAIL]}
				createdAt={project[FIELDS.CREATED_AT]}
			/>
			:
			<div className="d-flex justify-content-center mt-5">
				{edit && <EditButtons Id={projectId} />}
			</div>
			<About aboutText={project[FIELDS.DESCRIPTION]} />
			<Problem problemText={project[FIELDS.PROBLEM_DESCRIPTION]} />
			<Solution solutionText={project[FIELDS.SOLUTION]} />
			<Implementation
				implementationText={project[FIELDS.IMPLEMENTATION]}
			/>
			<Team
				teamMembers={[
					project.m1,
					project.m2,
					project.m3,
					project.m4,
					project.m5,
				]}
			/>
			<MentorReview
				imageURL={project[FIELDS.IMAGE_URL]}
				reviewText={project[FIELDS.MENTOR_REVIEW]}
			/>
			<Attachments
				githubURL={project[FIELDS.GITHUB_LINK]}
				reportURL={project[FIELDS.REPORT_URL]}
				imageURL={project[FIELDS.IMAGE_URL]}
			/>
			<FeedbackForm />
			<ProjectFeedbacks feedbacks={feedbacks} />
		</>
	);
}
