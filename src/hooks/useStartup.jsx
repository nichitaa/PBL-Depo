import {useEffect} from 'react';
import * as api from "./api";
import {useDB} from "../context/DBContext";
import {useAuth} from "../context/AuthContext";

const useStartup = () => {

    const {currentUser: user} = useAuth(); // get the current user

    const {
        getProjects,
        getUserProjects,
        setStats,
        setUserProjectsData,
    } = useDB();

    // default sort for card group, grab the newest projects first (run once)
    useEffect(() => {
        console.log("First useEffect, getting first time data 😆")
        getProjects("createdAt", "desc") // -> get all projects (listener)
        getUserProjects() // if auth then get users projects
        api.newRequestsListeners() //  -> if admin changes some projects from 'request' collection (listener)
        api.getStats(setStats); // -> listener to app stats
        // eslint-disable-next-line
    }, [])

    // when user changes
    useEffect(() => {
        console.log("User State Changed!")
        // reset projects data
        setUserProjectsData({data: []})
        // get the new projects data
        getUserProjects()
        // eslint-disable-next-line
    }, [user])

}

export default useStartup;