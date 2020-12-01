import {db} from "../firebase/firebase";
import * as COLLECTIONS from "../constants/collections";
import * as FIELDS from "../constants/fields";

export async function addNewUser(id, email) {
    const docRef = db.collection(COLLECTIONS.USERS).doc(id)
    return await docRef.set({
        [FIELDS.EMAIL]: email,
    }).then(() => {
        console.log("+1 user to db");
    }).catch(err => console.log(err))
}

export async function newRequest(Id, data) {
    const docRef = db.collection(COLLECTIONS.PROJECTS_REQUESTS).doc(Id)
    return await docRef.set({
        ...data,
        [FIELDS.ID]: Id,
        [FIELDS.PUBLISHED]: false
    }).then(() => {
        alert('Your request will be moderated soon!')
    }).catch(err => alert(err))
}

export async function newRequestsListeners(currentUserUID) {
    const unsubscribe = await db.collection(COLLECTIONS.PROJECTS_REQUESTS)
        .where(FIELDS.PUBLISHED, "==", true) // -> only those projects where the admin changed value to true
        .onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                const project = doc.data(); // get the data
                upload(doc.id, project, currentUserUID); // upload it to the main projects collection
                addProjectToUser(project, currentUserUID); // link it to the user acc
                // delete this request
                return db.collection(COLLECTIONS.PROJECTS_REQUESTS)
                    .doc(doc.id)
                    .delete()
            })
        })
    return () => unsubscribe();
}

export async function upload(Id, project, currentUserUID) {
    const docRef = db.collection(COLLECTIONS.PROJECTS).doc(Id)
    return await docRef.set({
        ...project,
        [FIELDS.ID]: Id,
    }).then(() => {
        // if the project does not belongs to current user
        if (currentUserUID !== project[FIELDS.USER_ID]) {
            alert('A new project was just uploaded! Go check it out')
        }
    }).catch(error => {
        alert(error.message)
    })
}

export async function deleteProject(Id) {
    // first -> move it to the deleted projects collection
    let userId;
    const moveToDeletedCollection = async () => {
        // get project data
        await getProjectById(Id)
            .then(async ({project, feedback}) => {
                // update DeletedProjects collection
                return await db.collection(COLLECTIONS.DELETED_PROJECTS)
                    .doc(project[FIELDS.ID])
                    .set({
                        ...project,
                        [FIELDS.FEEDBACKS]: feedback,
                    })
                    .then(() => userId = project[FIELDS.USER_ID]) // get the projects owner
                    .catch(err => console.log(err));
            })
    }
    // second -> delete the project from main projects collection
    moveToDeletedCollection().then(async () => {
        // nested deletion
        return await db.collection(COLLECTIONS.PROJECTS)
            .doc(Id)
            .collection(COLLECTIONS.PROJECT_FEEDBACKS) // first -> delete projects feedbacks collection
            .get()
            .then(res => {
                res.forEach(item => {
                    item.ref.delete()
                })
            })
            .then(async () => {
                await db.collection(COLLECTIONS.PROJECTS) // second -> delete the project data
                    .doc(Id)
                    .delete()
                    .then(async () => {
                        await db.collection(COLLECTIONS.USERS_PROJECTS) // third -> delete form users projects
                            .doc(userId)
                            .collection(COLLECTIONS.USER_PROJECTS)
                            .doc(Id)
                            .delete()
                            .then(() => {
                                alert('Your project has been deleted successfully!')
                            })
                    })
            })
    });
}

export async function addProjectToUser(project, currentUserUID) {
    // new doc with the user id in this collection or reference to previous user doc
    const userDocument = db.collection(COLLECTIONS.USERS_PROJECTS).doc(project[FIELDS.USER_ID])
    return await userDocument.collection(COLLECTIONS.USER_PROJECTS)
        .doc(project[FIELDS.ID])
        .set({
            [FIELDS.TITLE]: project[FIELDS.TITLE],
            [FIELDS.ID]: project[FIELDS.ID],
        })
        .then(() => {
            // if the current user is the owner of the newly approved project
            if (currentUserUID === project[FIELDS.USER_ID]) {
                alert("Congratulations! Your project was approved!")
            }
        }).catch(error => {
            alert(error.message)
        });
}

export async function getProjectById(Id) {
    const docRef = db.collection(COLLECTIONS.PROJECTS).doc(Id)
    return await docRef.get()
        .then(async (snapshot) => {
            const feedback = await getProjectFeedback(Id)
            const project = await snapshot.data()
            return {project, feedback}
        })
}

export async function getProjectFeedback(Id) {
    const docRef = db.collection(COLLECTIONS.PROJECTS).doc(Id)
        .collection(COLLECTIONS.PROJECT_FEEDBACKS)
    return docRef.get()
        .then((snapshot) => {
            let feedback = []
            snapshot.forEach(doc => {
                feedback.push(doc.data())
            })
            return feedback
        })
}

export async function sendFeedback(project, feedback, rating, user) {
    const docRef = db.collection(COLLECTIONS.PROJECTS).doc(project[FIELDS.ID])
        .collection(COLLECTIONS.PROJECT_FEEDBACKS).doc(user.uid)
    // update feedbacks collection
    return await docRef.set({ // set, because users one user can not have multiple feedbacks on the same project
        // 1 feedback only that he might change
        [FIELDS.FEEDBACK_MESSAGE]: feedback,
        [FIELDS.FEEDBACK_EMAIL]: user.email,
        [FIELDS.FEEDBACK_RATING]: rating,
    }).then(async () => {
        // update rating value
        updateRating().then()
        return getProjectById(project.Id) // return the updated project
    })

    function updateRating() {
        // update project rating
        const currentRating = project[FIELDS.RATING];
        const updatedRating = (currentRating + rating) / 2;
        const docRef = db.collection(COLLECTIONS.PROJECTS).doc(project[FIELDS.ID]);
        return docRef.update({[FIELDS.FEEDBACK_RATING]: updatedRating});
    }
}

export async function isUserProject(Id, user) {
    const docRef = db.collection(COLLECTIONS.USERS_PROJECTS).doc(user.uid)
        .collection(COLLECTIONS.USER_PROJECTS).doc(Id)
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