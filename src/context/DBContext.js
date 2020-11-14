import React, { useContext, useEffect, useState } from 'react';
import {db, storage} from "../firebase/firebase";
import {useAuth} from "./AuthContext";

const DBContext = React.createContext();

export const useDB = () => {
    return useContext(DBContext);
}

export const DBProvider = ({children}) => {

    const {currentUser} = useAuth(); // get the current user

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

    // get projects by filters
    const getProjects = (orderBy, direction) => {
        const unsubscribe = db.collection('ProjectForm')
            .orderBy(orderBy, direction)
            .onSnapshot((snapshot) => {
                setProjects(snapshot.docs.map((doc) => doc.data()));
                setDisplayedProjects(snapshot.docs.map((doc) => doc.data()));
            });
        return () => unsubscribe();
    }

    // updates/create project -> adds project to user acc
    const UploadProject = async (projId, form) => {
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
            userEmail: currentUser.email,
            userId: currentUser.uid,
            rating: 5,
        }
        const [document] = await Promise.all([db.collection('ProjectForm')
            .doc(projId)
            .set({
                ...data,
                projectId: projId,
            }).then(() => {
                alert('The project was successfully uploaded')
                AddUserProject(projId, form)
            }).catch(error => {
                alert(error.message)
            })])
        return document;
    }

    // submit new project with image, pdf report, inputs state
    const SubmitNewProjectForm = async (formState) => {
        // create a local document
        const document = db.collection('ProjectForm').doc()
        const documentId = document.id
        await UploadProject(documentId, formState)
    }

    // deleting the project by id
    const DeleteProject = async (projId) => {
        const unsubscribe = await db.collection('ProjectForm')
            .doc(projId).delete().then(() => {
                db.collection('UsersProjects')
                    .doc(currentUser.uid).collection('UserProjects')
                    .doc(projId).delete().then(() => {
                        alert('Your project has been deleted successfully!')
                })
            })
        return () => unsubscribe;
    }

    // updates the project in db
    const UpdateProjectForm = async (projId, form) => {
        await UploadProject(projId, form)
    }

    // updates userProjects collection, when the new project was summited
    // populates db -> updates *** userProjectsData ***
    const AddUserProject = async (projId, proj) => {
        // new doc with the user id in this collection
        const userDocument = db.collection('UsersProjects').doc(currentUser.uid)
        const [response] = await Promise.all([userDocument.collection('UserProjects')
            .doc(projId)
            .set({
                ProjectName: proj.title,
                id: projId,
            })
            .then(() => {
                alert("Project was added to user account!")
                // update user projects state
                getUserProjects()
            }).catch(error => {
                alert(error.message)
            })]);
        return response;
    }

    // get proj details + feedbacks details by id ( updates the state of the projectPage )
    // updates -> *** projState && projFeedback ***
    const getProjectById = async (projId) => {
        const unsubscribe = await db.collection('ProjectForm')
            .doc(projId).get()
            .then(snapshot => {
                setProjState(prevState => snapshot.data())
                // grab the projects feedbacks collection
                db.collection('ProjectForm')
                    .doc(projId)
                    .collection('Feedbacks')
                    .onSnapshot((snapshot) => {
                        setProjFeedback(snapshot.docs.map((doc) => doc.data()))
                        console.log("getting project")
                    })
            })
        // console.log("getting project data: ✔")
        return () => unsubscribe;
    }

    // send feedback for a project -> populate db -> update current project page
    const sendFeedback = async (feedback, rating) => {
        const unsubscribe = await db.collection('ProjectForm')
            .doc(projState.projectId)
            .collection('Feedbacks')
            .doc(currentUser.uid)
            // update feedbacks collection
            .set({
                message: feedback,
                email: currentUser.email,
                rating: rating,
            }).then(() => {
                // update project rating
                let currentProjectRating = projState.rating
                if (isNaN(currentProjectRating)) {
                    currentProjectRating = 5
                }
                let updatedRating = (currentProjectRating + rating) / 2
                db.collection('ProjectForm')
                    .doc(projState.projectId)
                    .update({
                        "rating": updatedRating
                    }).then(() => {
                    alert("Rating was updated successfully!")
                    // update current project state, to rerender the project page with new rating
                    getProjectById(projState.projectId)
                })
            })
        return () => unsubscribe;
    }

    // user projects -> updates -> *** userProjectsData ***
    const getUserProjects = async () => {
        if (!currentUser) {
            return []
        } else {
            console.log("Getting user Projects Data!")
            let unsubscribe = await db.collection('UsersProjects')
                .doc(currentUser.uid)
                .collection('UserProjects')
                .onSnapshot(function (querySnapshot) {
                    let projIds = []
                    querySnapshot.forEach(function (doc) {
                        projIds.push(doc.id) // get the projects ids
                    })
                    getData(projIds) // get projects data
                })
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
            // stop listen to changes
            return () => unsubscribe;
        }
    }

    // true - false -> updates -> *** editPermission ***
    const isUserProject = async (projId) => {
        const docRef = await db.collection('UsersProjects')
            .doc(currentUser.uid)
            .collection('UserProjects')
            .doc(projId)
        const doc = await docRef.get()

        if (doc.exists) {
            setEditPermission(prev => true)
            return true;
        } else {
            setEditPermission(prev => false)
            return false;
        }
    }

    // default sort for card group, grab the newest projects first (run once)
    useEffect(() => {
        console.log("First useEffect, getting first time data 😆")
        getProjects("createdAt", "desc")
        getUserProjects()
    }, [])

    // when user changes
    useEffect(() => {
        console.log("User State Changed!")
        // reset projects data
        setUserProjectsData({data: []})
        // get the new projects data
        getUserProjects()
    }, [currentUser])

    const value = {
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
        UpdateProjectForm,
        DeleteProject,

        SubmitNewProjectForm,
        getProjectById,
        sendFeedback,
    }

    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    );
}