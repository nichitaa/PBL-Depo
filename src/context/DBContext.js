import React, {useContext, useEffect, useState} from 'react';
import {db, storage} from "../firebase/firebase";
import {useAuth} from "./AuthContext";

const DBContext = React.createContext();

export const useDB = () => {
    return useContext(DBContext);
}

export const DBProvider = ({children}) => {

    const {currentUser} = useAuth();

    // all projects from db
    const [projects, setProjects] = useState([]);

    // user projects data
    const [userProjectsData, setUserProjectsData] = useState({ data: [] });

    // project feedback
    const [projFeedback, setProjFeedback] = useState([]);

    // current project
    const [projState, setProjState] = useState([]);

    // get projects by filters
    const getProjects = (orderBy, direction) => {
        const unsubscribe = db.collection('ProjectForm')
            .orderBy(orderBy, direction)
            .onSnapshot((snapshot) => {
                setProjects(snapshot.docs.map((doc) => doc.data()))
            });
        return () => unsubscribe();
    }

    // the form of adding new project
    const SubmitNewProjectForm = async (img, report, formState) => {
        // upload bg image to storage
        const storageRef = storage.ref();
        const fileRef = storageRef.child(img.name);
        await fileRef.put(img);

        // upload pdf report
        const reportRef = storageRef.child(report.name);
        await reportRef.put(report);

        // data object to be stored
        let data = {
            projectName: formState.projectName,
            projectDescription: formState.projectDescription,
            projectProblemDescription: formState.projectProblemDescription,
            projectTheoryDescription: formState.projectTheoryDescription,
            projectImageURL: await fileRef.getDownloadURL(),
            projectReportURL: await reportRef.getDownloadURL(),
            createdAt: new Date(),
            userEmail: currentUser.email,
            userId: currentUser.uid,
            rating: 5,
        }

        // create a local document
        const document = db.collection('ProjectForm').doc()
        const documentId = document.id

        const response = await document.set({
            ...data,
            projectId: documentId,
        }).then(() => {
            alert('someone implement a cool pop up alert ' +
                'now close the alert and and look at the available projects!')
            AddUserProject(documentId, formState)
        }).catch(error => {
            alert(error.message)
        })

        return response
    }

    // updates userProjects collection, when the new project was summited
    const AddUserProject = async (projId, proj) => {
        // new doc with the user id in this collection
        const userDocument = db.collection('UsersProjects').doc(currentUser.uid)
        const response = userDocument.collection('UserProjects')
            .doc(projId)
            .set({
                ProjectName: proj.projectName,
                id: projId,
            })
            .then(() => {
                alert("Project added to user acc")
                // update user projects state
                getUserProjects()
            }).catch(error => {
                alert(error.message)
            })
        return response
    }

    // get proj details + feedbacks details by id ( updates the state of the projectPage )
    const getProjectById = (projId) => {
        const unsubscribe = db.collection('ProjectForm')
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

    // send feedback for a project
    const sendFeedback = (feedback, rating) => {
        const unsubscribe = db.collection('ProjectForm')
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
        return () => unsubscribe
    }

    // user projects
    const getUserProjects = () => {
        if (!currentUser) {
            return []
        } else {
            console.log("Getting user Projects Data!")
            let unsubscribe = db.collection('UsersProjects')
                .doc(currentUser.uid)
                .collection('UserProjects')
                .onSnapshot(function (querySnapshot) {
                    let projIds = []
                    querySnapshot.forEach(function (doc) {
                        projIds.push(doc.id)
                    })
                    getData(projIds)
                })

            const getData = (ids) => {
                console.log("User has " + ids.length + " projects 🎦")
                let tempData = []
                ids.map(id => {
                    return db.collection('ProjectForm')
                        .doc(id).get()
                        .then(snapshot => {
                            tempData.push(snapshot.data())
                            // update user projects with new data
                            setUserProjectsData({data: tempData} )
                        })
                })
            }
            // stop listen to changes
            return () => unsubscribe()
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
        setUserProjectsData({ data: [] })
        // get the new projects data
        getUserProjects()
    }, [currentUser])

    const value = {
        projects, // all projects state
        getProjects, // function to get the projects depending on filters

        userProjects: userProjectsData.data, // only users projects data, if any and user logged in

        // individual project
        setProjState,
        projState,
        projFeedback,

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