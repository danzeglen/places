import React, { createContext, useEffect, useState } from 'react';
import { fire, db } from '../fireconfig'
const UserContext = createContext()

const FireProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [userDetails, setUserDetails] = useState();
    const [currentAddress, setCurrentAddress] = useState('Cambridge, ON, CA');
    const [createError, setCreateError] = useState('')
    const [profileDone, setProfileDone] = useState(false);

    const signIn = (email,password) => {
    
        fire.auth().signInWithEmailAndPassword(email, password).then((usercred) => {
            console.log('signed in')
        }
        ).catch((err) => {
            console.log(err)
        })
    }

    const logout = () => {
        fire.auth().signOut().then(() => {
            console.log('sign out succsess')
        }).catch((err) => {
            console.log('error')
        })
    }

    const createAccount = (email, password, displayName) => {
        console.log('RAN')
        console.log(displayName)
        console.log('^^&&&^^^&&^^')
        fire.auth().createUserWithEmailAndPassword(email, password).then((res) => {
            console.log(res)
            db.collection('users').doc(res.user.uid).set({
                email: email
            })
            res.user.updateProfile({
                displayName: displayName,
                email: email
            }).then((response) => {
                console.log(response)
                setProfileDone(true);
            }).catch((error) => {
                console.log('error profile updating')
            })
        }).catch((err) => {
            setCreateError(err.message)
        })
    }

    const getAccountDetails = async (usercred) => {
        let details = await db.collection('users').doc(usercred.uid).get()

        if(!details.empty){
            setCurrentAddress(details.data().defaultcity)
            setUserDetails(details.data())
        }
    }

    useEffect(() => {
        let unmounted = false;
        fire.auth().onAuthStateChanged(async (usercred) => {
            if (usercred) {
                if (!unmounted) {
                    setUser(usercred)
                    getAccountDetails(usercred)

                }
            } else {
                if (!unmounted) {
                    setUser(null)
                }
            }
        })

        return () => { unmounted = true };
    }, [profileDone])

    return (

        <UserContext.Provider value={{
            signIn,
            createAccount,
            logout,
            user,
            currentAddress,
            setCurrentAddress,
            createError,
            userDetails,
            setUserDetails
        }}>
            {children}
        </UserContext.Provider>
    );
}

export { FireProvider, UserContext };