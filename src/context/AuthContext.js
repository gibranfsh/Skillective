import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { auth } from "../firebase";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
    }

    const facebookSignIn = () => {
        const provider = new FacebookAuthProvider()
        signInWithRedirect(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        //diubah-ubah kepin
        //gw ngubah unsubscribe jadi function bukan variable, jadi kalo di return itu jadi return function
        const unsubscribe = () => {
            onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser)
                console.log("Authcontext", currentUser)
            })
        }
        return (() => {
            unsubscribe()
        })
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, facebookSignIn, logOut, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}