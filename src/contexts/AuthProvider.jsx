import React, { useState } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }


    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('current user info', currentUser)
            setUser(currentUser);
            setTimeout(() => {
                setLoading(false);
            }, 200); 
            

        })
        //clear the observer on unmount
        return ()=>{
            unsubscribe();
        }
    },[])


    const authInfo = {
        user,
        loading,
        createUser, 
        signInUser,
        signInWithGoogle,
        signOutUser,
    }

    return (
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
  )
}
export default AuthProvider;