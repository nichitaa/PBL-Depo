import {db} from "../firebase/fire";
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

export async function newRequest(Id, data) {
    const unsubscribe = await db.collection(COLLECTIONS.PROJECTS_REQUESTS)
        .doc(Id)
        .set({
            ...data,
            Id: Id,
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
                addProjectToUser(project.userId, project); // link it to the user acc
                // delete this request
                return db.collection(COLLECTIONS.PROJECTS_REQUESTS)
                    .doc(doc.id)
                    .delete()
            })
        })
    return () => unsubscribe();
}

export async function upload(Id, data) {
    return await db.collection(COLLECTIONS.PROJECTS)
        .doc(Id)
        .set({
            ...data,
            Id: Id,
        }).then(() => {
            alert('A new project was just uploaded! Go check it out')
        }).catch(error => {
            alert(error.message)
        })
}

export async function deleteProject(Id, userId) {
    // first -> move it to the deleted projects collection
    const moveToDeletedCollection = async () => {
        // get project data
        await getProjectById(Id)
            .then(async ({project, feedback}) => {
            // update DeletedProjects collection
            return await db.collection(COLLECTIONS.DELETED_PROJECTS)
                .doc(project.Id)
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
                        await db.collection(COLLECTIONS.USERS_PROJECTS)
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

export async function addProjectToUser(userId, project) {
    // new doc with the user id in this collection or reference to previous user doc
    const userDocument = db.collection(COLLECTIONS.USERS_PROJECTS).doc(userId)
    const [response] = await Promise.all([userDocument.collection(COLLECTIONS.USER_PROJECTS)
        .doc(project.Id)
        .set({
            ProjectName: project.projectName,
            Id: project.Id,
        })
        .then(() => {
            // todo: -> need to check if current user id == project user id && after display the alert
            alert("Congratulations! A project has been assigned to your account!")
        }).catch(error => {
            alert(error.message)
        })]);
    return response;
}

export async function getProjectById(Id) {
    return await db.collection(COLLECTIONS.PROJECTS)
        .doc(Id)
        .get()
        .then(async (snapshot) => {
            const feedback = await getProjectFeedback(Id)
            const project = await snapshot.data()
            return {project, feedback}
        })
}

export async function getProjectFeedback(Id) {
    return db.collection(COLLECTIONS.PROJECTS)
        .doc(Id)
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
        .doc(project.Id)
        .collection(COLLECTIONS.PROJECT_FEEDBACKS)
        .doc(user.uid)
        // update feedbacks collection
        .set({
            message: feedback,
            email: user.email,
            rating: rating,
        }).then(async () => {
            updateRating() // update
            return await getProjectById(project.Id) // return the updated project
        })

    function updateRating() {
        // update project rating
        let currentProjectRating = project.rating
        if (isNaN(currentProjectRating)) {
            currentProjectRating = 5
        }
        let updatedRating = (currentProjectRating + rating) / 2
        return db.collection(COLLECTIONS.PROJECTS)
            .doc(project.Id)
            .update({
                "rating": updatedRating
            })
    }
}

export async function isUserProject(Id, user) {
    const docRef = db.collection(COLLECTIONS.USERS_PROJECTS)
        .doc(user.uid)
        .collection(COLLECTIONS.USER_PROJECTS)
        .doc(Id)
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