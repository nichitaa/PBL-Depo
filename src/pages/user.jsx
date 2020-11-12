import React  from 'react';
import {useAuth} from "../context/AuthContext";
import {useDB} from "../context/DBContext";
import { CardGrid } from "../components";

export default function User () {

    const { currentUser } = useAuth();
    const { userProjects: projects } = useDB()

    return (
        <div>
            <h3><strong>My Email: </strong>{currentUser.email}</h3>
            <h3>My PBL Projects:</h3>
            {
                projects[0] ?
                    <CardGrid projects={projects} />:
                    <p>U dont have any projects yet</p>
            }
        </div>
    );

}