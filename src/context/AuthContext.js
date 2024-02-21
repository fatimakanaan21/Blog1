import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FirebaseContext } from "./FirebaseContext";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  const { app } = useContext(FirebaseContext)
  const auth = getAuth(app)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user', user)
      setUser(user)
    })

    return () => {
      unsubscribe()
    }
  }, [auth])


  const signup = async ({ email, password }) => {
    const creds = await createUserWithEmailAndPassword(auth, email, password)
    console.log('creds', creds)
  }

  const login = async ({ email, password }) => {
    const creds = await signInWithEmailAndPassword(auth, email, password)
    console.log('creds', creds)
  }

  const logout = async () => {
    await signOut(auth)
  }



  return <AuthContext.Provider value={{ signup, login, user, isAuth: !!user, logout }} >
    {children}
  </AuthContext.Provider>
}