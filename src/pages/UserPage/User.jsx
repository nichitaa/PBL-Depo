import React, {useEffect, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {useDB} from "../../context/DBContext";
import {CardGrid} from "../../components";
import {Loading} from "../../components";

let flag = true;

export default function User() {

    const [loading, setLoading] = useState(false)
    const {currentUser: user} = useAuth();
    const {userProjects: projects} = useDB()

    useEffect(() => {
        if (flag === true) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                flag = false
            }, 2000)
        }
    }, [])

    return (
        <>
            {
                loading ?
                    <Loading/> :
                    projects ?
                        <>
                            <h2><strong>My Email: </strong>{user.email}</h2>
                            <h2>My PBL Projects:</h2>
                            <CardGrid projects={projects}/>
                        </> :
                        <>
                            <h2><strong>My Email: </strong>{user.email}</h2>
                            <h2>My PBL Projects:</h2>
                            <p>U dont have any projects yet</p>
                        </>
            }
        </>

    );
}