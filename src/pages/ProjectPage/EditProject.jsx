import React, {useEffect, useState} from 'react';
import * as ROUTES from "../../constants/routes";
import {useDB} from "../../context/DBContext";
import EditProjectContainer from "../../components/containers/EditProjectContainer";
import {useAuth} from "../../context/AuthContext";
import Loading from "../../components/LoadingSpiner/Loading";
import history from "../../constants/history"

export default function EditProject({match}) {

    const [editPermission, setEditPermission] = useState(false);
    const {isUserProject} = useDB();
    const {currentUser: user} = useAuth();
    const projectId = match.params.id

    useEffect(() => {
        const getEditPermission = async () => {
            return await isUserProject(projectId)
        }
        if (user) {
            getEditPermission().then(response => {
                console.log('Edit Permission for this user: ', response)
                if(response) {
                    // setTimeout(() => {
                    setEditPermission(true);
                    // }, 1000)
                } else {
                    alert("You are not allowed to modify this project!")
                    history.push(`${ROUTES.CATALOGUE}`)
                    window.location.reload(false)
                }
            })
        } else {
            alert("Please Sing In first!")
            history.push(ROUTES.LOG_IN)
            window.location.reload(false);
        }
    }, [projectId])


    return (
        <div>
            {
                !editPermission ?
                    <Loading/> :
                    <EditProjectContainer projectId={projectId}/>
            }
        </div>
    )
}