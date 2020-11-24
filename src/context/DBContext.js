import React, {useContext, useEffect, useMemo, useState} from 'react';
import {db, storage} from "../firebase/firebase";
import {useAuth} from "./AuthContext";
import * as api from "../hooks/api";

const DBContext = React.createContext();

export const useDB = () => {
    return useContext(DBContext);
}

export const DBProvider = ({children}) => {

    const {currentUser: user} = useAuth(); // get the current user

    // all projects from db
    const [projects, setProjects] = useState([]);
    // displayed projects
    const [displayedProjects, setDisplayedProjects] = useState([]);
    // user projects data
    const [userProjectsData, setUserProjectsData] = useState({data: []});
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
    })

    // get projects by filters
    const getProjects = async (orderBy, direction) => {
        setLoading(true)
        return db.collection('ProjectForm')
            .orderBy(orderBy, direction)
            .onSnapshot((snapshot) => {
                setProjects(snapshot.docs.map((doc) => doc.data()));
                setDisplayedProjects(snapshot.docs.map((doc) => doc.data()));
                setLoading(false)
            });
    }

    // -> new request to updates/create project
    const uploadProject = async (projId, form) => {
        // global storage reference
        const storageRef = storage.ref();
        // upload bg image to storage
        const fileRef = storageRef.child(form.img.name);
        await fileRef.put(form.img);
        // upload pdf report
        const reportRef = storageRef.child(form.report.name);
        await reportRef.put(form.report);
        // data object to be stored
        let data = {
            projectName: form.title,
            projectDescription: form.description,
            projectProblemDescription: form.problemDescription,
            projectTheoryDescription: form.theoryDescription,
            projectImageURL: await fileRef.getDownloadURL(),
            projectReportURL: await reportRef.getDownloadURL(),
            createdAt: new Date(),
            userEmail: user.email,
            userId: user.uid,
            rating: 5,
        }

        return api.newRequest(projId, data)
    }

    // submit new project with image, pdf report, inputs state
    const addNewProject = async (formState) => {
        // create a local document
        const document = db.collection('ProjectForm').doc()
        const documentId = document.id
        await uploadProject(documentId, formState)
    }

    // deleting the project by id
    const deleteProject = async (projId) => {
        return api.deleteProject(projId, user.uid)
    }

    // updates the project in db
    const updateProject = async (projId, form) => {
        await uploadProject(projId, form)
    }

    // get proj details + feedbacks details by id ( updates the state of the projectPage )
    // updates -> *** projState && projFeedback ***
    const getProjectById = async (projId) => {
        return api.getProjectById(projId).then(({project, feedback}) => {
            setProjFeedback(feedback)
            setProjState(project)
        })
    }

    // send feedback for a project -> populate db -> update current project page
    const sendFeedback = async (feedback, rating) => {
        return api.sendFeedback(projState, feedback, rating, user).then(({project, feedback}) => {
            setProjFeedback(feedback)
            setProjState(project)
        })
    }

    // user projects -> updates -> *** userProjectsData ***
    const getUserProjects = async () => {
        if (!user) {
            return []
        } else {
            console.log("Getting user Projects Data!")
            // ***{updates userProjectsData}*** get data for each project, by projects ids
            const getData = (ids) => {
                console.log("User has " + ids.length + " projects 🎦")
                let tempData = []
                ids.map(id => {
                    return db.collection('ProjectForm')
                        .doc(id).get()
                        .then(snapshot => {
                            tempData.push(snapshot.data())
                            // update user projects with new data
                            setUserProjectsData({data: tempData})
                        })
                })
            }
            return db.collection('UsersProjects')
                .doc(user.uid)
                .collection('UserProjects')
                .onSnapshot(function (querySnapshot) {
                    let projIds = []
                    querySnapshot.forEach(function (doc) {
                        projIds.push(doc.id) // get the projects ids
                    })
                    getData(projIds) // get projects data
                })
        }
    }

    // true - false -> updates -> *** editPermission ***
    const isUserProject = async (projId) => {
        return api.isUserProject(projId, user).then(response => {
            setEditPermission(response)
            return response
        })
    }

    // default sort for card group, grab the newest projects first (run once)
    useEffect(() => {
        console.log("First useEffect, getting first time data 😆")
        getProjects("createdAt", "desc") // -> get all projects (listener)
        getUserProjects() // if auth then get users projects
        api.newRequestsListeners() //  -> if admin changes some projects from 'request' collection (listener)
        api.getStats(setStats); // -> listener to app stats
    }, [])

    // when user changes
    useEffect(() => {
        console.log("User State Changed!")
        // reset projects data
        setUserProjectsData({data: []})
        // get the new projects data
        getUserProjects()
    }, [user])

    const value = {
        loading,
        stats,

        projects, // all projects state
        setProjects, // update state for fuse live search
        getProjects, // function to get the projects depending on filters

        displayedProjects,
        setDisplayedProjects,

        userProjects: userProjectsData.data, // only users projects data, if any and user logged in
        isUserProject,

        // individual project
        setProjState,
        projState,
        projFeedback,
        editPermission,
        updateProject,
        deleteProject,

        addNewProject,
        getProjectById,
        sendFeedback,
    }

    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    );
}