import {db} from "../firebase/firebase";
import * as COLLECTIONS from "../constants/collections";

export async function newRequest(projId, data) {
    const unsubscribe = await db.collection(COLLECTIONS.PROJECTS_REQUESTS)
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
    const unsub = await db.collection(COLLECTIONS.PROJECTS_REQUESTS)
        .where("published", "==", true) // -> only those projects where the admin changed value to true
        .onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                const project = doc.data(); // get the data
                upload(doc.id, project); // upload it to the new collection
                addProjectToUser(doc.id, project.userId, project); // link it to the user acc
                // delete this request
                db.collection(COLLECTIONS.PROJECTS_REQUESTS)
                    .doc(doc.id)
                    .delete()
            })
        })
    return () => unsub();
}

export async function upload(projId, data) {
    return await db.collection(COLLECTIONS.PROJECTS)
        .doc(projId)
        .set({
            ...data,
            projectId: projId,
        }).then(() => {
            alert('A new project was just uploaded! Go check it out')
            updateStats('Projects', 'add')
        }).catch(error => {
            alert(error.message)
        })
}

// todo: create a new collection for deleted projects and move them there
export async function deleteProject(projId, userId) {
    const unsubscribe = await db.collection(COLLECTIONS.PROJECTS)
        .doc(projId)
        .delete().then(() => {
            db.collection(COLLECTIONS.USERS_PROJECTS)
                .doc(userId).collection(COLLECTIONS.USER_PROJECTS)
                .doc(projId).delete().then(() => {
                alert('Your project has been deleted successfully!')
                updateStats('Projects', 'delete')
            })
        })
    return () => unsubscribe;
}

export async function addProjectToUser(projId, userId, proj) {
    // new doc with the user id in this collection or reference to previous user doc
    const userDocument = db.collection(COLLECTIONS.USERS_PROJECTS).doc(userId)
    const [response] = await Promise.all([userDocument.collection(COLLECTIONS.USER_PROJECTS)
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
    return await db.collection(COLLECTIONS.PROJECTS)
        .doc(projId).get()
        .then(async (snapshot) => {
            const feedback = await getProjectFeedback(projId)
            const project = await snapshot.data()
            return {project, feedback}
        })
}

export async function getProjectFeedback(projId) {
    return db.collection(COLLECTIONS.PROJECTS)
        .doc(projId)
        .collection(COLLECTIONS.PROJECT_FEEDBACKS)
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
    return await db.collection(COLLECTIONS.PROJECTS)
        .doc(project.projectId)
        .collection(COLLECTIONS.PROJECT_FEEDBACKS)
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
        db.collection(COLLECTIONS.PROJECTS)
            .doc(project.projectId)
            .update({
                "rating": updatedRating
            })
    }
}

export async function isUserProject(projId, user) {
    const docRef = await db.collection(COLLECTIONS.USERS_PROJECTS)
        .doc(user.uid)
        .collection(COLLECTIONS.USER_PROJECTS)
        .doc(projId)
    const doc = await docRef.get() // get the doc
    // if doc exists -> true
    return !!doc.exists;
}

export async function updateStats(doc, method) {
    const docref = db.collection(COLLECTIONS.STATS)
        .doc(doc)
    docref.get().then(doc => {
        const temp = doc.data();
        if (method === "add"){
            docref.update({
                "Total": temp.Total + 1,
            })
        } else {
            docref.update({
                "Total": temp.Total - 1,
            })
        }
    })
}

// todo: update projects stats using PROJECTS collection .size property
export async function getStats(setStats) {
    return db.collection(COLLECTIONS.STATS)
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