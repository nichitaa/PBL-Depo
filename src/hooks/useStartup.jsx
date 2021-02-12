import { useEffect } from "react";
import { useDB } from "../context/DBContext";
import { useAuth } from "../context/AuthContext";
import * as api from "./api";
import * as FIELDS from "../constants/fields";

const useStartup = () => {
	const { currentUser: user } = useAuth(); // get the current user

	const {
		getProjects,
		getRecentProjects,
		getUserProjects,
		setStats,
		setUserProjectsData,
	} = useDB();

	// default sort for card group, grab the newest projects first (run once)
	useEffect(() => {
		console.log("First useEffect, getting first time data 😆");
		getProjects(FIELDS.CREATED_AT, "desc"); // -> get all projects (listener)
		getRecentProjects(3); // -> get the projects for the landing page (listener to newest projects)
		getUserProjects(); // if auth then get users projects
		if (user != null) {
			api.newRequestsListeners(user.uid); //  -> if admin changes some projects from 'request' collection (listener)
		} else {
			api.newRequestsListeners();
		}

		api.getStats(setStats); // -> listener to app stats
		// eslint-disable-next-line
	}, []);

	// when user changes
	useEffect(() => {
		console.log("User State Changed!");
		// reset projects data
		setUserProjectsData({ data: [] });
		// get the new projects data
		getUserProjects();
		// eslint-disable-next-line
	}, [user]);
};

export default useStartup;
