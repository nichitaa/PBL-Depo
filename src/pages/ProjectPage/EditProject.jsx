import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {useDB} from "../../context/DBContext";
import EditProjectContainer from "../../components/containers/EditProjectContainer";
import {useAuth} from "../../context/AuthContext";
import Loading from "../../components/LoadingSpiner/Loading";

export default function EditProject({match}) {

    const [editPermission, setEditPermission] = useState(false);
    const {isUserProject} = useDB();
    const {currentUser: user} = useAuth();
    const history = useHistory();
    const projId = match.params.id

    useEffect(() => {
        const getEditPermission = async () => {
            return await isUserProject(projId)
        }
        if (user) {
            getEditPermission().then(response => {
                console.log('Edit Permission for this user: ', response)
                if(response) {
                    // setTimeout(() => {
                        setEditPermission(true);
                    // }, 1000)
                } else {
                    history.push(`${ROUTES.CATALOGUE}/${projId}`)
                }
            })
        } else {
            history.push(ROUTES.LOG_IN)
        }
    }, [projId])


    return (
        <div>
            {
                !editPermission ?
                    <Loading/> :
                    <EditProjectContainer projId={projId}/>
            }
        </div>
    )
}

