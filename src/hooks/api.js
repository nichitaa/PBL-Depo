import {db} from "../firebase/firebase";

export async function newRequest(projId, data) {
    const unsubscribe = await db.collection('ProjectsRequests')
        .doc(projId)
        .set({
            ...data,
            projectId: projId,
            published: false
        }).then(() => {
            alert('Your request will be moderated soon!')
        }).catch(err => alert(err))
    return () => unsubscribe();
}

export async function newRequestsListeners() {
    const unsub = await db.collection('ProjectsRequests')
        .where("published", "==", true) // -> only those projects where the admin changed value to true
        .onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                const project = doc.data(); // get the data
                upload(doc.id, project); // upload it to the new collection
                addProjectToUser(doc.id, project.userId, project); // link it to the user acc
                // delete this request
                db.collection('ProjectsRequests')
                    .doc(doc.id)
                    .delete()
            })
        })
    return () => unsub();
}

export async function upload(projId, data) {
    return await db.collection('ProjectForm')
        .doc(projId)
        .set({
            ...data,
            projectId: projId,
        }).then(() => {
            alert('A new project was just uploaded! Go check it out')
            updateStats('Projects')
        }).catch(error => {
            alert(error.message)
        })
}

export async function deleteProject(projId, userId) {
    const unsubscribe = await db.collection('ProjectForm')
        .doc(projId).delete().then(() => {
            db.collection('UsersProjects')
                .doc(userId).collection('UserProjects')
                .doc(projId).delete().then(() => {
                alert('Your project has been deleted successfully!')
            })
        })
    return () => unsubscribe;
}

export async function addProjectToUser(projId, userId, proj) {
    // new doc with the user id in this collection or reference to previous user doc
    const userDocument = db.collection('UsersProjects').doc(userId)
    const [response] = await Promise.all([userDocument.collection('UserProjects')
        .doc(projId)
        .set({
            ProjectName: proj.projectName,
            id: projId,
        })
        .then(() => {
            // -> need to check if current user id == project user id ***
            alert("Congratulations! A project has been assigned to your account!")
        }).catch(error => {
            alert(error.message)
        })]);
    return response;
}

export async function getProjectById(projId) {
    return await db.collection('ProjectForm')
        .doc(projId).get()
        .then(async (snapshot) => {
            const feedback = await getProjectFeedback(projId)
            const project = await snapshot.data()
            return {project, feedback}
        })
}

export async function getProjectFeedback(projId) {
    return db.collection('ProjectForm')
        .doc(projId)
        .collection('Feedbacks')
        .get()
        .then((snapshot) => {
            let feedback = []
            snapshot.forEach(doc => {
                feedback.push(doc.data())
            })
            return feedback
        })
}

export async function sendFeedback(project, feedback, rating, user) {
    return await db.collection('ProjectForm')
        .doc(project.projectId)
        .collection('Feedbacks')
        .doc(user.uid)
        // update feedbacks collection
        .set({
            message: feedback,
            email: user.email,
            rating: rating,
        }).then(async () => {
            updateRating() // update
            return await getProjectById(project.projectId) // return the updated project
        })

    function updateRating() {
        // update project rating
        let currentProjectRating = project.rating
        if (isNaN(currentProjectRating)) {
            currentProjectRating = 5
        }
        let updatedRating = (currentProjectRating + rating) / 2
        db.collection('ProjectForm')
            .doc(project.projectId)
            .update({
                "rating": updatedRating
            })
    }
}

export async function isUserProject(projId, user) {
    const docRef = await db.collection('UsersProjects')
        .doc(user.uid)
        .collection('UserProjects')
        .doc(projId)
    const doc = await docRef.get() // get the doc
    // if doc exists -> true
    return !!doc.exists;
}

export async function updateStats(doc) {
    const docref = db.collection('Stats')
        .doc(doc)
    docref.get().then(doc => {
        const temp = doc.data();
        docref.update({
            "Total": temp.Total + 1,
        })
    })
}

export async function getStats(setStats) {
    return db.collection('Stats')
        .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                if (doc.id === "Projects") {
                    setStats(prev => ({
                            ...prev,
                            projects: doc.data().Total
                        })
                    )
                } else {
                    setStats(prev => ({
                            ...prev,
                            users: doc.data().Total
                        })
                    )
                }
            })
        });
}