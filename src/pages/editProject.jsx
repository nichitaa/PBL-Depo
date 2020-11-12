import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import * as ROUTES from "../constants/routes";
import {useDB} from "../context/DBContext";
import UpdateProjectContainer from "../components/containers/UpdateProjectContainer";
import {SemipolarLoading} from 'react-loadingg';
import {useAuth} from "../context/AuthContext";

const LoadingComponent = () => <div><SemipolarLoading/></div>

export default function EditProject({match}) {
    const projId = match.params.id

    const {isUserProject} = useDB();
    const {currentUser} = useAuth();

    const [editPermission, setEditPermission] = useState(false);

    const history = useHistory();


    useEffect(() => {
        if (currentUser) {
            const getEditPermission = async () => {
                return await isUserProject(projId)
            }
            getEditPermission().then((response) => {
                console.log('Edit Project Page Permission: ', response)
                // show loading for 3 seconds
                setTimeout(() => {
                    if (response === false) {
                        history.push(`${ROUTES.CATALOGUE}/${projId}`)
                    } else {
                        setEditPermission(true);
                    }
                }, 2000)
            })
        } else {
            history.push(ROUTES.LOG_IN)
        }
    }, [projId])


    return (
        <div>
            {
                !editPermission ?
                    <LoadingComponent/> :
                    <UpdateProjectContainer projId={projId}/>
            }
        </div>
    )
}

