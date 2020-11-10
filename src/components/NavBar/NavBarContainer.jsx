import React, {useState} from 'react';
import PBLNavBar from "./NavBar";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";


const NavBarContainer = () => {

    const {currentUser, logout} = useAuth();

    // for form modal
    const [showAddForm, setShowAddForm] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();

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
            />
    )
};
export default NavBarContainer;