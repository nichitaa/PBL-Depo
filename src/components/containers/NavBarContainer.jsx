import React, {useState} from 'react';
import PBLNavBar from "../NavBar/NavBar";
import {useAuth} from "../../context/AuthContext";
import history from "../../constants/history";


const NavBarContainer = () => {

    const {currentUser, logout} = useAuth();

    // for form modal
    const [showAddForm, setShowAddForm] = useState(false);
    const [error, setError] = useState('');

    const hideModal = () => {
        setShowAddForm(false);
    }

    const handleLogout = async (e) => {
        setError('');
        try {
            await logout();
            history.push('/login');
            window.location.reload(false);
        } catch {
            setError('Failed to Log Out!');
            alert(error);
        }
    }

    const handleShowFormModal = (e) => {
        if (!currentUser) {
            alert('Please Log In or Sigh Up to upload new projects')
            history.push('/signup');
            window.location.reload(false);
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