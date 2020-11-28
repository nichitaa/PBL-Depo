import React, {useContext, useEffect, useState} from 'react';
import { auth } from '../firebase/firebase';
import * as api from "../hooks/api";


const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                api.addNewUser(user.user.uid, user.user.email); // update Users collection
            });
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return () => unsubscribe();
    }, []);


    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
    };

    // we dont render any children until we have the current user set for the first time
    return (
        <AuthContext.Provider value={value}>
            {/*if we are not loading then we render the children*/}
            {!loading && children}
        </AuthContext.Provider>
    );

}
