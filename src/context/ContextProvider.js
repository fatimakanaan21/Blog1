import React from 'react'
import { AuthProvider } from "./AuthContext"
import { FirebaseProvider } from "./FirebaseContext"
import { PostsProvider } from "./PostsContext"

const ContextProvider = ({ children }) => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <PostsProvider>
          {children}
        </PostsProvider>
      </AuthProvider>
    </FirebaseProvider>
  )
}

export default ContextProvider