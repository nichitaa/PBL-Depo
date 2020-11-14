import React, {useEffect, useState} from 'react';
import PBLNavBar from "../NavBar/NavBar";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {useDB} from "../../context/DBContext";
import Fuse from "fuse.js";


const NavBarContainer = () => {

    const {currentUser, logout} = useAuth();

    // for form modal
    const [showAddForm, setShowAddForm] = useState(false);
    const [error, setError] = useState('');

    // for fuse live search
    const [search, setSearch] = useState('');
    const { setDisplayedProjects, projects } = useDB();

    // use effect on search bar input field change
    useEffect(() => {
        // searching in allProjects
        const fuse = new Fuse(projects, {
            keys: [
                'projectName',
                'projectDescription',
            ]
        });
        const result = fuse.search(search).map(({ item }) => item); // convert the result to array of objects
        // if there is a result project and the search input field value contains more than 2 characters
        if (search.length > 2 && result.length > 0 ) {
            setDisplayedProjects( prev => result ); // update the projects to be displayed
        } else { // reset to all projects
            setDisplayedProjects( projects );
        }
    }, [search])

    const history = useHistory();

    const changeSearch = (e) => {
        setSearch(e.target.value)
    }

    const hideModal = () => {
        setShowAddForm(false);
    }

    const handleLogout = async (e) => {
        setError('');
        try {
            await logout();
            history.push('/login');
        } catch {
            setError('Failed to Log Out!');
            alert(error);
        }
    }

    const handleShowFormModal = (e) => {
        if (!currentUser) {
            alert('Please Log In or Sigh Up to upload new projects')
            history.push('/signup')
        } else {
            setShowAddForm(true)
        }
    }

    return (
            <PBLNavBar currentUser={currentUser}
                       showAddForm={showAddForm}
                       setShowAddForm={setShowAddForm}
                       hideModal={hideModal}
                       handleLogout={handleLogout}
                       handleShowFormModal={handleShowFormModal}
                       search={search}
                       changeSearch={changeSearch}
            />
    )
};
export default NavBarContainer;