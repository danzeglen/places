import React, { createContext, useEffect, useState } from 'react';
import { fire, db } from '../fireconfig'
const UserContext = createContext()

const FireProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [currentAddress, setCurrentAddress] = useState('Cambridge, ON, CA');

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
        fire.auth().createUserWithEmailAndPassword(email, password).then((res) => {
            console.log(res)
            db.collection('users').doc(res.uid).set({
                email: email
            })
            res.updateProfile({
                displayName: displayName
            }).then((response) => {
                console.log('profile updateed')
            }).catch((error) => {
                console.log('error profile updating')
            })
        }).catch((err) => {
            console.log('error')
        })
    }

    useEffect(() => {
        let unmounted = false;
        fire.auth().onAuthStateChanged(async (usercred) => {
            if (usercred) {
                if (!unmounted) {
                    setUser(usercred)
                }
            } else {
                if (!unmounted) {
                    setUser(null)
                }
            }
        })

        return () => { unmounted = true };
    }, [])

    return (

        <UserContext.Provider value={{
            signIn,
            createAccount,
            logout,
            user,
            currentAddress,
            setCurrentAddress
        }}>
            {children}
        </UserContext.Provider>
    );
}

export { FireProvider, UserContext };