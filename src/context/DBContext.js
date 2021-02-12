import React, { useContext, useState } from "react";
import { db, storage } from "../firebase/firebase";
import { useAuth } from "./AuthContext";
import * as api from "../hooks/api";
import * as COLLECTIONS from "../constants/collections";
import * as FIELDS from "../constants/fields";

const DBContext = React.createContext();

export const useDB = () => {
	return useContext(DBContext);
};

export const DBProvider = ({ children }) => {
	const { currentUser: user } = useAuth(); // get the current user

	// all projects from db
	const [projects, setProjects] = useState([]);
	// displayed projects
	const [displayedProjects, setDisplayedProjects] = useState([]);
	// recent projects
	const [recentProjects, setRecentProjects] = useState([]);
	// user projects data
	const [userProjectsData, setUserProjectsData] = useState({ data: [] });
	// project feedback
	const [projFeedback, setProjFeedback] = useState([]);
	// current project data
	const [projState, setProjState] = useState([]);
	// current project edit permissions
	const [editPermission, setEditPermission] = useState(false);
	const [loading, setLoading] = useState(false);

	// users && projects live stats
	const [stats, setStats] = useState({
		users: 0,
		projects: 0,
	});

	// pagination context:
	const [currentPage, setCurrentPage] = useState(1);
	const [projectsPerPage] = useState(8);

	// get projects by filters:  *** -> listeners
	const getProjects = async (orderBy, direction) => {
		setLoading(true);
		return db
			.collection(COLLECTIONS.PROJECTS)
			.orderBy(orderBy, direction)
			.onSnapshot((snapshot) => {
				setProjects(snapshot.docs.map((doc) => doc.data()));
				setDisplayedProjects(snapshot.docs.map((doc) => doc.data()));
				setLoading(false);
			});
	};

	const getProjectsByYear = (year) => {
		if (year === "all") {
			setDisplayedProjects(projects);
		} else {
			const sorted = []
				.concat(projects) // from all projects
				.filter((project) => project[FIELDS.YEAR] === `${year}`); // filter by year
			setDisplayedProjects(sorted);
		}
	};

	const getProjectsByRating = (rating) => {
		if (rating === "lowfirst") {
			const sorted = []
				.concat(displayedProjects) // only from already displayed ones
				.sort((a, b) => (b[FIELDS.RATING] > a[FIELDS.RATING] ? 1 : -1));
			setDisplayedProjects(sorted);
		} else if (rating === "highfirst") {
			const sorted = []
				.concat(displayedProjects)
				.sort((a, b) => (a[FIELDS.RATING] > b[FIELDS.RATING] ? 1 : -1));
			setDisplayedProjects(sorted);
		}
	};

	const getProjectsByDate = (date) => {
		if (date === "newest") {
			const sorted = []
				.concat(displayedProjects) // only from already displayed ones
				.sort((a, b) =>
					b[FIELDS.CREATED_AT] > a[FIELDS.CREATED_AT] ? 1 : -1
				);
			setDisplayedProjects(sorted);
		} else if (date === "oldest") {
			const sorted = []
				.concat(displayedProjects)
				.sort((a, b) =>
					a[FIELDS.CREATED_AT] > b[FIELDS.CREATED_AT] ? 1 : -1
				);
			setDisplayedProjects(sorted);
		}
	};

	const getRecentProjects = (limit) => {
		return db
			.collection(COLLECTIONS.PROJECTS)
			.orderBy(FIELDS.CREATED_AT, "desc")
			.limit(limit) // first n projects filtered by timestamp
			.onSnapshot((snapshot) => {
				setRecentProjects(snapshot.docs.map((doc) => doc.data()));
			});
	};

	// -> new request to updates/create project
	const uploadProject = async (Id, projectForm) => {
		// global storage reference
		const storageRef = storage.ref();
		// upload bg image to storage
		const fileRef = storageRef.child(projectForm[FIELDS.IMAGE_URL].name);
		await fileRef.put(projectForm[FIELDS.IMAGE_URL]);
		// upload pdf report
		const reportRef = storageRef.child(projectForm[FIELDS.REPORT_URL].name);
		await reportRef.put(projectForm[FIELDS.REPORT_URL]);
		// data object to be stored
		let data = {
			...projectForm,
			[FIELDS.IMAGE_URL]: await fileRef.getDownloadURL(),
			[FIELDS.REPORT_URL]: await reportRef.getDownloadURL(),
			[FIELDS.CREATED_AT]: new Date(),
			[FIELDS.USER_EMAIL]: user.email,
			[FIELDS.USER_ID]: user.uid,
			[FIELDS.RATING]: 5,
		};
		return api.newRequest(Id, data);
	};

	// submit new project with image, pdf report, inputs state
	const addNewProject = async (projectForm) => {
		// create a document in projects collection && pass it's id
		const document = db.collection(COLLECTIONS.PROJECTS).doc();
		const documentId = document.id;
		await uploadProject(documentId, projectForm);
	};

	// deleting the project by id
	const deleteProject = async (Id) => {
		return api.deleteProject(Id, user.uid);
	};

	// updates the project in db
	const updateProject = async (Id, projectForm) => {
		await uploadProject(Id, projectForm);
	};

	// get proj details + feedbacks details by id ( updates the state of the projectPage )
	// updates -> *** projState && projFeedback ***
	const getProjectById = async (Id) => {
		return api.getProjectById(Id).then(({ project, feedback }) => {
			setProjFeedback(feedback);
			setProjState(project);
		});
	};

	// send feedback for a project -> populate db -> update current project page
	const sendFeedback = async (feedback, rating) => {
		return api
			.sendFeedback(projState, feedback, rating, user)
			.then(({ project, feedback }) => {
				setProjFeedback(feedback);
				setProjState(project);
			});
	};

	// user projects -> updates -> *** userProjectsData ***
	const getUserProjects = async () => {
		if (!user) {
			return [];
		} else {
			console.log("Getting user Projects Data!");
			// ***{updates userProjectsData}*** get data for each project, by projects ids
			const getData = (projectsIds) => {
				console.log("User has " + projectsIds.length + " projects 🎦");
				let tempData = [];
				projectsIds.map((id) => {
					return db
						.collection(COLLECTIONS.PROJECTS)
						.doc(id)
						.get()
						.then((snapshot) => {
							tempData.push(snapshot.data());
							// update user projects with new data
							setUserProjectsData({ data: tempData });
						});
				});
			};
			return db
				.collection(COLLECTIONS.USERS_PROJECTS)
				.doc(user.uid)
				.collection(COLLECTIONS.USER_PROJECTS)
				.onSnapshot(function (querySnapshot) {
					let projectsIds = [];
					querySnapshot.forEach(function (doc) {
						projectsIds.push(doc.id); // get the projects ids
					});
					getData(projectsIds); // get projects data
				});
		}
	};

	// true - false -> updates -> *** editPermission ***
	const isUserProject = async (Id) => {
		return api.isUserProject(Id, user).then((response) => {
			setEditPermission(response);
			return response;
		});
	};

	const value = {
		// for startup:
		getProjects, // listener -> gets projects by rating/createdAt filter
		getProjectsByRating,
		getProjectsByDate,
		getRecentProjects, // listener -> gets first 3 projects filtered by date
		recentProjects, // state -> first 3 recent projects
		getUserProjects, // listener -> gets only users projects if exists
		setUserProjectsData, // setState -> users projects
		setStats, // setState -> updates stats

		// other utils:
		loading, // state -> loading
		stats, // state -> stats

		projects, // state -> all projects
		setProjects, // setState -> update state for fuse live search
		getProjectsByYear, // listener -> filter projects by year if requested
		displayedProjects, // state -> the displayed projects (for fuse.js)
		setDisplayedProjects, // setState -> set displayed projects (for fuse.js)

		// user related:
		userProjects: userProjectsData.data, // state -> only users projects data
		isUserProject, // function -> checks if the project belongs to current user

		// individual project:
		projState, // state -> one project data
		setProjState, // setState -> set one project data
		projFeedback, // state -> one project feedback
		editPermission, // state -> if the project belongs to current user
		updateProject, // function -> request update project with new data
		deleteProject, // function -> deletes project

		addNewProject, // function -> request uploading new project
		getProjectById, // function -> updates the state for the project && feedback
		sendFeedback, // function -> updates a project with new user feedback

		// pagination values
		currentPage,
		setCurrentPage,
		projectsPerPage,
	};

	return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
};
