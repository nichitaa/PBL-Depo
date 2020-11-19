import {db} from "../firebase/firebase";

export async function upload(projId, data) {
    const [document] = await Promise.all([db.collection('ProjectForm')
        .doc(projId)
        .set({
            ...data,
            projectId: projId,
        }).then(() => {
            alert('The project was successfully uploaded')
            // addProjectToUser(projId, form)
        }).catch(error => {
            alert(error.message)
        })])
    return document;
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
    // new doc with the user id in this collection
    const userDocument = db.collection('UsersProjects').doc(userId)
    const [response] = await Promise.all([userDocument.collection('UserProjects')
        .doc(projId)
        .set({
            ProjectName: proj.title,
            id: projId,
        })
        .then(() => {
            alert("Project was added to user account!")
            // update user projects state
            // getUserProjects()
        }).catch(error => {
            alert(error.message)
        })]);
    return response;
}

export async function getProjectById(projId)    {
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
    // setEditPermission(prev => response);
    return !!doc.exists;
}