import {db} from "../firebase/firebase";
import * as COLLECTIONS from "../constants/collections";

export async function addNewUser(id, email) {
    const unsubscribe = await db.collection(COLLECTIONS.USERS)
        .doc(id)
        .set({
            email: email,
        }).then(() => {
            console.log("+1 user to db");
        }).catch(err => console.log(err))
    return () => unsubscribe();
}

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
    const unsubscribe = await db.collection(COLLECTIONS.PROJECTS_REQUESTS)
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
    return () => unsubscribe();
}

export async function upload(projId, data) {
    return await db.collection(COLLECTIONS.PROJECTS)
        .doc(projId)
        .set({
            ...data,
            projectId: projId,
        }).then(() => {
            alert('A new project was just uploaded! Go check it out')
        }).catch(error => {
            alert(error.message)
        })
}

export async function deleteProject(projId, userId) {
    // first -> move it to the deleted projects collection
    const moveToDeletedCollection = async () => {
        // get project data
        await getProjectById(projId).then(async ({project, feedback}) => {
            // update DeletedProjects collection
            return await db.collection(COLLECTIONS.DELETED_PROJECTS)
                .doc(project.projectId)
                .set({
                    ...project,
                    feedbacks: feedback,
                })
                .then()
                .catch(err => console.log(err));
        })
    }
    // second -> delete the project from main projects collection
    moveToDeletedCollection().then(async () => {
        // nested deletion
        return await db.collection(COLLECTIONS.PROJECTS)
            .doc(projId)
            .collection(COLLECTIONS.PROJECT_FEEDBACKS) // first -> delete projects feedbacks collection
            .get()
            .then(res => {
                res.forEach(item => {
                    item.ref.delete()
                })
            })
            .then(async () => {
                await db.collection(COLLECTIONS.PROJECTS) // second -> delete the project data
                    .doc(projId)
                    .delete()
                    .then(async () => {
                        await db.collection(COLLECTIONS.USERS_PROJECTS)
                            .doc(userId)
                            .collection(COLLECTIONS.USER_PROJECTS)
                            .doc(projId)
                            .delete()
                            .then(() => {
                                alert('Your project has been deleted successfully!')
                            })
                    })
            })
    });
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

export function getStats(setStats) {
    db.collection(COLLECTIONS.PROJECTS)
        .onSnapshot(snapshot => {
            console.log("total projects ->", snapshot.size);
            setStats(prev => ({
                ...prev,
                projects: snapshot.size,
            }))
        })
    db.collection(COLLECTIONS.USERS)
        .onSnapshot(snapshot => {
            console.log("total users ->", snapshot.size);
            setStats(prev => ({
                ...prev,
                users: snapshot.size,
            }))
        })
}