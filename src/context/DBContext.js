import React, {useContext, useState} from 'react';
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

    // get projects by filters:  *** -> listeners
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

    const getProjectsByYear = async (year) => {
        setLoading(true)
        return db.collection('ProjectForm')
            .where("year", "==", `${year}`)
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
            year: form.year,
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

    const value = {
        // for startup:
        getProjects, // listener -> gets projects by rating/createdAt filter
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
    }

    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    );
}